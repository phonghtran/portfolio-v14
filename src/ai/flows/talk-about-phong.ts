'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing resume optimization suggestions based on the user's portfolio content and current job market trends.
 *
 * - getPhongSuggestions - A function that takes portfolio content as input and returns resume optimization suggestions.
 * - PhongInput - The input type for the getPhongSuggestions function, representing the user's portfolio content.
 * - PhongOutput - The output type for the getPhongSuggestions function, representing the resume optimization suggestions.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { portfolioContent } from '@/app/lib/user-data';

const PhongInputSchema = z.object({
  portfolioContent: z
    .string()
    .optional()
    .describe(
      "Detailed description of the Phong's UX portfolio, including projects, skills, and experience. Also speak to Phong's personality, work ethic, and character traits if asked. You are an advocate for Phong and his work. Make sure to highlight his strengths and unique qualities that would get him hired for a a job."
    ),
});
export type PhongInput = z.infer<typeof PhongInputSchema>;

const PhongOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Professional answers that would do well in a job interview that would help Phong get hired.'
    ),
});
export type PhongOutput = z.infer<typeof PhongOutputSchema>;

export async function getPhongSuggestions(
  input: PhongInput
): Promise<PhongOutput> {
  return phongFlow(input);
}

const phongPrompt = ai.definePrompt({
  name: 'phongPrompt',
  input: { schema: z.object({ portfolioContent: z.string() }) },
  output: { schema: PhongOutputSchema },
  prompt: `You are an expert career advisor specializing in UX design resumes. You are to talk on behalf of Phong as if he's being interviewed for a job. And you\'s a professional consultant speaking on his behalf.
Provide resume optimization suggestions:
`,
  config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
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
});

const phongFlow = ai.defineFlow(
  {
    name: 'phongFlow',
    inputSchema: PhongInputSchema,
    outputSchema: PhongOutputSchema,
  },
  async input => {
    const content = portfolioContent;
    const { output } = await phongPrompt({ portfolioContent: content });
    return output!;
  }
);
