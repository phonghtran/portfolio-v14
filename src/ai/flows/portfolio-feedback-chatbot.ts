'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing feedback on a UX portfolio.
 *
 * It includes:
 * - `getPortfolioFeedback`: A function that takes portfolio content and returns feedback.
 * - `PortfolioFeedbackInput`: The input type for the `getPortfolioFeedback` function.
 * - `PortfolioFeedbackOutput`: The output type for the `getPortfolioFeedback` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { portfolioContent } from '@/app/lib/user-data';

const PortfolioFeedbackInputSchema = z.object({
  portfolioContent: z
    .string()
    .optional()
    .describe(
      'The complete text content of the UX portfolio to be reviewed. If not provided, the default portfolio content will be used.'
    ),
});

export type PortfolioFeedbackInput = z.infer<
  typeof PortfolioFeedbackInputSchema
>;

const PortfolioFeedbackOutputSchema = z.object({
  overallFeedback: z.string().describe('Overall feedback on the UX portfolio.'),
  projectFeedback: z
    .string()
    .describe('Detailed feedback on the individual projects in the portfolio.'),
  skillAssessment: z
    .string()
    .describe('Assessment of the skills demonstrated in the portfolio.'),
  presentationFeedback: z
    .string()
    .describe(
      'Feedback on the overall presentation and design of the portfolio.'
    ),
});

export type PortfolioFeedbackOutput = z.infer<
  typeof PortfolioFeedbackOutputSchema
>;

export async function getPortfolioFeedback(
  input: PortfolioFeedbackInput
): Promise<PortfolioFeedbackOutput> {
  return portfolioFeedbackFlow(input);
}

const portfolioFeedbackPrompt = ai.definePrompt({
  name: 'portfolioFeedbackPrompt',
  input: { schema: PortfolioFeedbackInputSchema },
  output: { schema: PortfolioFeedbackOutputSchema },
  prompt: `You are a seasoned UX design lead providing feedback on a UX portfolio.

  Based on the provided portfolio content, provide actionable feedback in the following areas:

  1.  Overall Feedback: Provide a summary of the portfolio's strengths and weaknesses.
  2.  Project Feedback: Provide detailed feedback on individual projects, focusing on the design process, problem-solving, and outcomes.
  3.  Skill Assessment: Assess the skills demonstrated in the portfolio and identify any gaps.
  4.  Presentation Feedback: Provide feedback on the overall presentation and design of the portfolio, including visual appeal and user experience.

  Portfolio Content:
  {{{portfolioContent}}}`,
});

const portfolioFeedbackFlow = ai.defineFlow(
  {
    name: 'portfolioFeedbackFlow',
    inputSchema: PortfolioFeedbackInputSchema,
    outputSchema: PortfolioFeedbackOutputSchema,
  },
  async input => {
    const content = input.portfolioContent || portfolioContent;
    const { output } = await portfolioFeedbackPrompt({
      portfolioContent: content,
    });
    return output!;
  }
);
