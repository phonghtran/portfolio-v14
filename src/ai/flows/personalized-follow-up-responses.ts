'use server';
/**
 * @fileOverview A thin, non-streaming wrapper over the portfolio chat prompt,
 * kept mainly so the flow shows up in the Genkit dev UI with portfolioContent
 * auto-injected (so you only supply message + chatHistory when testing).
 *
 * The prompt itself lives in prompts/portfolioChat.prompt (dotprompt).
 * Production streaming is handled by the route at src/app/api/chat/route.ts.
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

const personalizedFollowUpFlow = ai.defineFlow(
  {
    name: 'personalizedFollowUpFlow',
    inputSchema: PersonalizedFollowUpInputSchema,
    outputSchema: PersonalizedFollowUpOutputSchema,
  },
  async ({ message, chatHistory }) => {
    const chatPrompt = ai.prompt('portfolioChat');
    const { text } = await chatPrompt({
      message,
      chatHistory: chatHistory ?? [],
      portfolioContent,
    });
    return { response: text };
  }
);
