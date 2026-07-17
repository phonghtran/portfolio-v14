import { ai } from '@/ai/genkit';
import { portfolioContent } from '@/app/lib/user-data';

// Genkit + the Google GenAI SDK need the Node runtime; POST is always dynamic.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Streaming chat endpoint. Streams the assistant's reply as plain-text chunks so
 * the UI can render tokens as they arrive. The prompt lives in
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

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
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
      } finally {
        controller.close();
      }
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
