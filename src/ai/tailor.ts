import { z } from 'genkit';
import { ai } from '@/ai/genkit';
import { portfolioContent } from '@/app/lib/user-data';
import { rankableIds, rankableItems } from '@/lib/contents';
import { site } from '@/lib/site';
import {
  HEADLINE_MAX,
  MAX_PICKS,
  REASON_MAX,
  SUMMARY_MAX,
  TOPIC_MAX,
  sanitizeTailoring,
  type Tailoring,
} from '@/lib/tailoring';

const TailoringSchema = z.object({
  change: z
    .boolean()
    .describe(
      'True only if the latest message says what the visitor is hiring for or most interested in.'
    ),
  needsAnswer: z
    .boolean()
    .describe(
      'True if the latest message asks a question or for information that needs a written answer.'
    ),
  headline: z.string().describe(`Title Case, ${HEADLINE_MAX} characters max.`),
  topic: z
    .string()
    .describe(`Lowercase, ${TOPIC_MAX} characters max, e.g. "fintech".`),
  picks: z
    .array(z.object({ id: z.string(), reason: z.string() }))
    .describe(`Up to ${MAX_PICKS} items, most relevant first.`),
  summary: z
    .string()
    .describe(
      `2–3 sentences about Phong for this visitor, ${SUMMARY_MAX} characters max.`
    ),
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

export interface TailorResult {
  tailoring: Tailoring | null;
  /** The visitor asked something a written reply should answer. */
  needsAnswer: boolean;
}

/**
 * Runs before every reply. Decides whether the homepage should be tailored to
 * this visitor (contents order, headline, summary) and whether they asked
 * something that needs a written answer. On any failure it keeps the page as
 * it is and lets the reply answer normally.
 */
export async function tailorContents(
  conversation: Turn[],
  currentPicks: string[] = []
): Promise<TailorResult> {
  const transcript = conversation
    .slice(-12)
    .map(t => `${t.role === 'user' ? 'Visitor' : 'Assistant'}: ${t.content}`)
    .join('\n');

  try {
    const { output } = await ai.generate({
      prompt: `You tailor Phong Tran's portfolio homepage to a visitor: you reorder its table of contents and rewrite the short summary above it.

Items you can move to the top (id, kind, title, summary, [client · year or stack]):
${catalog}

Currently at the top: ${currentPicks.length ? currentPicks.join(', ') : 'nothing (default order)'}

Default summary: ${site.summary}

Portfolio facts (the only source for the summary):
${portfolioContent}

Conversation (the last Visitor line is the latest message):
${transcript}

Rules:
- change: true only when the latest message tells you what the visitor is hiring for or cares about, and it would change what's at the top. Greetings, off-topic messages, questions about availability or a single project: false, and leave headline, topic, picks and summary empty.
- needsAnswer: true when the latest message asks a question or asks for information ("what did he do at Mastercard?", "does he code?"). False when it only describes the role or team ("I'm hiring a product designer for a fintech team").
- picks: ${MAX_PICKS} or fewer item ids that best match, most relevant first. Only use ids from the list.
- headline: a short Title Case heading for the list, ${HEADLINE_MAX} characters max, e.g. "A Focus on Fintech", "Integrating AI", "Design Systems at Scale".
- topic: what the visitor cares about in a few lowercase words, ${TOPIC_MAX} characters max, e.g. "fintech", "ai", "design systems". It completes "Most relevant to …".
- reason: a fact about that item, not a pitch, ${REASON_MAX} characters max, e.g. "Payments · Mastercard", "Runs on Gemini".
- summary: rewrite the default summary for this visitor in 2–3 sentences, third person, ${SUMMARY_MAX} characters max. Lead with what's most relevant to their focus. Use only facts from the portfolio above: no invented employers, numbers or dates. Plain sentences, no markdown.`,
      output: { schema: TailoringSchema },
      config: { temperature: 0.2 },
    });
    if (!output) return { tailoring: null, needsAnswer: true };
    const tailoring = output.change
      ? sanitizeTailoring(output, rankableIds)
      : null;
    // Without a change there's nothing to look at, so always answer.
    return { tailoring, needsAnswer: !tailoring || output.needsAnswer };
  } catch (err) {
    console.error('Tailoring failed:', err);
    return { tailoring: null, needsAnswer: true };
  }
}
