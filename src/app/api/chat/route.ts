import { ai } from '@/ai/genkit';
import { portfolioContent } from '@/app/lib/user-data';
import { tailorContents } from '@/ai/tailor';
import { HEADER_SEPARATOR, TRAILER_SEPARATOR } from '@/lib/tailoring';
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
 * Streaming chat endpoint. Streams the assistant's reply as plain-text chunks so
 * the UI can render tokens as they arrive. The first reply of a visit opens
 * with a JSON header (HEADER_SEPARATOR-framed) carrying the homepage
 * tailoring; follow-ups end with a TRAILER_SEPARATOR and a JSON trailer. The prompt lives in
 * prompts/portfolioChat.prompt (dotprompt).
 */
export async function POST(req: Request) {
  let body: { message?: unknown; chatHistory?: unknown };
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

  const chat = ai.prompt('portfolioChat');
  const { stream } = chat.stream({ message, portfolioContent, chatHistory });

  // The first message of a visit (or after "Start over") customizes the site
  // before the answer: tailoring runs alongside the reply and is sent first.
  const firstMessage = chatHistory.length === 0;
  const upfront = firstMessage
    ? tailorContents([{ role: 'user', content: message }])
    : null;

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      let reply = '';
      let failed = false;
      if (upfront) {
        const tailoring = await upfront;
        controller.enqueue(
          encoder.encode(
            HEADER_SEPARATOR + JSON.stringify({ tailoring }) + HEADER_SEPARATOR
          )
        );
      }
      try {
        for await (const chunk of stream) {
          if (chunk.text) {
            reply += chunk.text;
            controller.enqueue(encoder.encode(chunk.text));
          }
        }
      } catch (err) {
        failed = true;
        console.error('Chat stream error:', err);
        // Surface a graceful message inline rather than a broken stream.
        controller.enqueue(
          encoder.encode(
            '\n\n_Sorry, I hit an error generating that response. Please try again._'
          )
        );
      }

      // Follow-ups: once the reply is complete, decide whether to reorder the
      // homepage contents and append it as a JSON trailer after a separator.
      // The client never shows the trailer; null means "keep the current
      // order". The first reply already sent its tailoring up front.
      const tailoring =
        upfront || failed || !reply.trim()
          ? null
          : await tailorContents([
              ...chatHistory,
              { role: 'user', content: message },
              { role: 'assistant', content: reply },
            ]);
      controller.enqueue(
        encoder.encode(TRAILER_SEPARATOR + JSON.stringify({ tailoring }))
      );
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
