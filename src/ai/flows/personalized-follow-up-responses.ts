'use server';
/**
 * @fileOverview The portfolio chat flow. The assistant speaks ABOUT Phong (in
 * third person) TO a visitor — typically a recruiter, hiring manager, or
 * potential collaborator — grounded strictly in his portfolio content.
 *
 * - personalizedFollowUp - Handles a chat turn, given the message + history.
 * - PersonalizedFollowUpInput - Input type for personalizedFollowUp.
 * - PersonalizedFollowUpOutput - Return type for personalizedFollowUp.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { portfolioContent } from '@/app/lib/user-data';

const PersonalizedFollowUpInputSchema = z.object({
  message: z.string().describe('The current message from the visitor.'),
  chatHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string(),
      })
    )
    .optional()
    .describe('The chat history between the visitor and the assistant.'),
});
export type PersonalizedFollowUpInput = z.infer<
  typeof PersonalizedFollowUpInputSchema
>;

const PersonalizedFollowUpOutputSchema = z.object({
  response: z.string().describe('The assistant’s reply about Phong.'),
});
export type PersonalizedFollowUpOutput = z.infer<
  typeof PersonalizedFollowUpOutputSchema
>;

export async function personalizedFollowUp(
  input: PersonalizedFollowUpInput
): Promise<PersonalizedFollowUpOutput> {
  return personalizedFollowUpFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFollowUpPrompt',
  input: { schema: PersonalizedFollowUpInputSchema },
  output: { schema: PersonalizedFollowUpOutputSchema },
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
  prompt: `You are Phong Tran's portfolio assistant. You speak ABOUT Phong (third
person: "he", "his", "Phong") TO a visitor — typically a recruiter, hiring
manager, or potential collaborator. The visitor is NOT Phong; never address
Phong directly and never use "you"/"your" to refer to his work.

GROUNDING (critical — this is a portfolio, never bluff):
- Answer ONLY from the portfolio content below.
- If something isn't covered, say so plainly and point to his resume or email
  (phong@phonghtran.com). Never invent projects, metrics, employers, or dates.

VOICE: Match Phong's brand — a systems thinker and facilitator who makes complex
ideas accessible with analogy and light humor. Confident and concrete, never
salesy or buzzword-heavy.

BEHAVIOR:
- Lead with specifics and quantified outcomes (e.g. "+10% CSAT", "saved 120+
  hours") — these are what recruiters remember.
- Keep answers tight: 2–4 short paragraphs or a few bullets. Offer to go deeper
  rather than dumping everything at once.
- When natural, suggest a relevant follow-up question the visitor might ask.
- For availability / rate / salary questions, direct them to contact Phong
  directly rather than speculating.
- Stay professional if a message is off-topic or adversarial, and redirect to
  his work.

FORMATTING:
- Use Markdown. Short paragraphs (2–4 sentences), **bold** for section headers
  when covering multiple topics, and bullet/numbered lists for multiple items.

---
Here is Phong's portfolio content:
---
${portfolioContent}
---

{{#if chatHistory}}
Conversation so far:
{{#each chatHistory}}
{{this.role}}: {{this.content}}
{{/each}}
{{/if}}

Visitor's message: {{{message}}}
Response: `,
});

const personalizedFollowUpFlow = ai.defineFlow(
  {
    name: 'personalizedFollowUpFlow',
    inputSchema: PersonalizedFollowUpInputSchema,
    outputSchema: PersonalizedFollowUpOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
