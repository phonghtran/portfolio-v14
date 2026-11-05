import { z } from 'genkit';
import { ai } from '@/ai/genkit';
import { rankableIds, rankableItems } from '@/lib/contents';
import {
  HEADLINE_MAX,
  MAX_PICKS,
  REASON_MAX,
  TOPIC_MAX,
  sanitizeTailoring,
  type Tailoring,
} from '@/lib/tailoring';

const TailoringSchema = z.object({
  change: z
    .boolean()
    .describe(
      'True only if the conversation says what the visitor is hiring for or most interested in.'
    ),
  headline: z.string().describe(`Title Case, ${HEADLINE_MAX} characters max.`),
  topic: z
    .string()
    .describe(`Lowercase, ${TOPIC_MAX} characters max, e.g. "fintech".`),
  picks: z
    .array(z.object({ id: z.string(), reason: z.string() }))
    .describe(`Up to ${MAX_PICKS} items, most relevant first.`),
});

const catalog = rankableItems
  .map(
    i =>
      `- ${i.id} (${i.kind === 'case-study' ? 'case study' : 'side project'}): ${i.title}. ${i.subtitle}${i.meta ? ` [${i.meta}]` : ''}`
  )
  .join('\n');

interface Turn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Decides whether the homepage contents should be reordered for this visitor,
 * and how. Runs after the reply has streamed. Returns null when there is
 * nothing to change or anything goes wrong, so the page keeps its order.
 */
export async function tailorContents(
  conversation: Turn[]
): Promise<Tailoring | null> {
  const transcript = conversation
    .slice(-12)
    .map(t => `${t.role === 'user' ? 'Visitor' : 'Assistant'}: ${t.content}`)
    .join('\n');

  try {
    const { output } = await ai.generate({
      prompt: `You reorder the table of contents on Phong Tran's portfolio homepage so a visitor sees the most relevant work first.

Items you can move to the top (id, kind, title, summary, [client · year or stack]):
${catalog}

Conversation:
${transcript}

Rules:
- Set change to false when the visitor hasn't said what they're hiring for or interested in (greetings, off-topic questions, questions about availability). Leave the other fields empty then.
- Otherwise pick ${MAX_PICKS} or fewer item ids that best match, most relevant first. Only use ids from the list.
- headline: a short Title Case heading for the list, ${HEADLINE_MAX} characters max, e.g. "A Focus on Fintech", "Integrating AI", "Design Systems at Scale".
- topic: what the visitor cares about in a few lowercase words, ${TOPIC_MAX} characters max, e.g. "fintech", "ai", "design systems". It completes "Most relevant to …".
- reason: a fact about that item, not a pitch, ${REASON_MAX} characters max, e.g. "Payments · Mastercard", "Runs on Gemini".`,
      output: { schema: TailoringSchema },
      config: { temperature: 0.2 },
    });
    if (!output?.change) return null;
    return sanitizeTailoring(output, rankableIds);
  } catch (err) {
    console.error('Tailoring failed:', err);
    return null;
  }
}
