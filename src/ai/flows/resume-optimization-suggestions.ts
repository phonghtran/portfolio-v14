'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing resume optimization suggestions based on the user's portfolio content and current job market trends.
 *
 * - getResumeOptimizationSuggestions - A function that takes portfolio content as input and returns resume optimization suggestions.
 * - ResumeOptimizationInput - The input type for the getResumeOptimizationSuggestions function, representing the user's portfolio content.
 * - ResumeOptimizationOutput - The output type for the getResumeOptimizationSuggestions function, representing the resume optimization suggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { portfolioContent } from '@/app/lib/user-data';

const ResumeOptimizationInputSchema = z.object({
  portfolioContent: z
    .string()
    .optional()
    .describe(
      'The content of the user\'s portfolio, including project descriptions, skills, and other relevant information.'
    ),
});
export type ResumeOptimizationInput = z.infer<typeof ResumeOptimizationInputSchema>;

const ResumeOptimizationOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      'Resume optimization suggestions based on the portfolio content and a an understanding of current job market trends.'
    ),
});
export type ResumeOptimizationOutput = z.infer<typeof ResumeOptimizationOutputSchema>;

export async function getResumeOptimizationSuggestions(
  input: ResumeOptimizationInput
): Promise<ResumeOptimizationOutput> {
  return resumeOptimizationFlow(input);
}

const resumeOptimizationPrompt = ai.definePrompt({
  name: 'resumeOptimizationPrompt',
  input: {schema: z.object({ portfolioContent: z.string() })},
  output: {schema: ResumeOptimizationOutputSchema},
  prompt: `You are an expert career advisor specializing in UX design resumes. Based on the user\'s portfolio content, provide specific and actionable suggestions for improving their resume. Consider current job market trends and tailor the suggestions accordingly.

Portfolio Content: {{{portfolioContent}}}

Provide resume optimization suggestions:
`, config: {
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

const resumeOptimizationFlow = ai.defineFlow(
  {
    name: 'resumeOptimizationFlow',
    inputSchema: ResumeOptimizationInputSchema,
    outputSchema: ResumeOptimizationOutputSchema,
  },
  async input => {
    const content = input.portfolioContent || portfolioContent;
    const {output} = await resumeOptimizationPrompt({ portfolioContent: content });
    return output!;
  }
);
