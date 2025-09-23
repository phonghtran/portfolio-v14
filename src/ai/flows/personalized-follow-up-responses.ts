'use server';
/**
 * @fileOverview An AI agent that provides personalized follow-up responses based on past conversations.
 *
 * - personalizedFollowUp - A function that handles the personalized follow-up process.
 * - PersonalizedFollowUpInput - The input type for the personalizedFollowUp function.
 * - PersonalizedFollowUpOutput - The return type for the personalizedFollowUp function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { portfolioContent } from '@/app/lib/user-data';

const PersonalizedFollowUpInputSchema = z.object({
  message: z.string().describe('The current message from the user.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The chat history between the user and the assistant.'),
});
export type PersonalizedFollowUpInput = z.infer<typeof PersonalizedFollowUpInputSchema>;

const PersonalizedFollowUpOutputSchema = z.object({
  response: z.string().describe('The personalized response from the chatbot.'),
});
export type PersonalizedFollowUpOutput = z.infer<typeof PersonalizedFollowUpOutputSchema>;

export async function personalizedFollowUp(input: PersonalizedFollowUpInput): Promise<PersonalizedFollowUpOutput> {
  return personalizedFollowUpFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFollowUpPrompt',
  input: {schema: PersonalizedFollowUpInputSchema},
  output: {schema: PersonalizedFollowUpOutputSchema},
  prompt: `You are a career advisor chatbot specializing in UX portfolios.

  You have access to the user's portfolio content. Use it to provide detailed, personalized, and relevant advice.
  Here is the user's portfolio information:
  ---
  ${portfolioContent}
  ---

  You will use the chat history to tailor your responses to the user, remembering past conversations and applying that context to future suggestions.
  Pay close attention to the user's portfolio, resume and skills they describe.

  {% if chatHistory %}
  Here is the chat history:
  {% for message in chatHistory %}
  {{message.role}}: {{message.content}}
  {% endfor %}
  {% endif %}

  Current message: {{{message}}}
  Response: `,
});

const personalizedFollowUpFlow = ai.defineFlow(
  {
    name: 'personalizedFollowUpFlow',
    inputSchema: PersonalizedFollowUpInputSchema,
    outputSchema: PersonalizedFollowUpOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
