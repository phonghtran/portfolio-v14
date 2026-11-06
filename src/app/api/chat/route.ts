import { ai } from '@/ai/genkit';
import { portfolioContent } from '@/app/lib/user-data';
import { tailorContents } from '@/ai/tailor';
import { HEADER_SEPARATOR, samePicks, type ChatHeader } from '@/lib/tailoring';
import { consumeRateLimit, getClientKey } from './rate-limit';
// Side-effect import: registers the getProjectDetails tool referenced by the
// portfolioChat dotprompt.
import '@/ai/tools/portfolio-tools';

// Genkit + the Google GenAI SDK need the Node runtime; POST is always dynamic.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Streaming chat endpoint. Every response opens with a JSON header
 * (HEADER_SEPARATOR-framed, see ChatHeader) saying how the homepage should be
 * tailored and whether a written reply follows. When the site was customized
 * there is no reply: the page itself is the answer, and the visitor is sent
 * to the contents. Otherwise the reply streams as plain-text chunks. The reply
 * prompt lives in prompts/portfolioChat.prompt (dotprompt).
 */
export async function POST(req: Request) {
  let body: {
    message?: unknown;
    chatHistory?: unknown;
    currentPicks?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const message = typeof body.message === 'string' ? body.message.trim() : '';
  if (!message) {
    return new Response('Message is required', { status: 400 });
  }

  // Server-side rate limit (mirrors the client limits) — a second gate against
  // direct API abuse that bypasses the UI. Consumes a slot only for valid input.
  const limit = consumeRateLimit(getClientKey(req));
  if (!limit.allowed) {
    return new Response(limit.reason, {
      status: 429,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Retry-After': String(limit.retryAfterSeconds),
      },
    });
  }

  // Keep the last 20 turns and pass only role/content.
  const chatHistory: ChatMessage[] = Array.isArray(body.chatHistory)
    ? (body.chatHistory as ChatMessage[])
        .filter(
          m =>
            m &&
            (m.role === 'user' || m.role === 'assistant') &&
            typeof m.content === 'string'
        )
        .slice(-20)
        .map(m => ({ role: m.role, content: m.content }))
    : [];

  // What's at the top of the visitor's homepage now, so a follow-up that
  // lands on the same picks doesn't count as a change.
  const currentPicks = Array.isArray(body.currentPicks)
    ? body.currentPicks.filter((id): id is string => typeof id === 'string')
    : [];

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const tailoring = await tailorContents(
        [...chatHistory, { role: 'user', content: message }],
        currentPicks
      );
      const changed =
        tailoring !== null && !samePicks(tailoring.picks, currentPicks);
      const header: ChatHeader = {
        tailoring: changed ? tailoring : null,
        // A customized site is the answer: the visitor goes to the contents.
        reply: !changed,
      };
      controller.enqueue(
        encoder.encode(
          HEADER_SEPARATOR + JSON.stringify(header) + HEADER_SEPARATOR
        )
      );

      if (header.reply) {
        try {
          const chat = ai.prompt('portfolioChat');
          const { stream } = chat.stream({
            message,
            portfolioContent,
            chatHistory,
          });
          for await (const chunk of stream) {
            if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
          }
        } catch (err) {
          console.error('Chat stream error:', err);
          // Surface a graceful message inline rather than a broken stream.
          controller.enqueue(
            encoder.encode(
              '\n\n_Sorry, I hit an error generating that response. Please try again._'
            )
          );
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      // Discourage proxy buffering so chunks flush promptly.
      'X-Accel-Buffering': 'no',
    },
  });
}
