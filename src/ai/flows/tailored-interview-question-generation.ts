'use server';
/**
 * @fileOverview Generates interview questions tailored to the user's portfolio projects and skills.
 *
 * - generateInterviewQuestions - A function that generates interview questions based on the portfolio content.
 * - InterviewQuestionInput - The input type for the generateInterviewQuestions function.
 * - InterviewQuestionOutput - The return type for the generateInterviewQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InterviewQuestionInputSchema = z.object({
  portfolioDescription: z
    .string()
    .describe('Detailed description of the user\'s UX portfolio, including projects, skills, and experience.'),
});
export type InterviewQuestionInput = z.infer<typeof InterviewQuestionInputSchema>;

const InterviewQuestionOutputSchema = z.object({
  interviewQuestions: z
    .array(z.string())
    .describe('An array of interview questions tailored to the user\'s portfolio.'),
});
export type InterviewQuestionOutput = z.infer<typeof InterviewQuestionOutputSchema>;

export async function generateInterviewQuestions(input: InterviewQuestionInput): Promise<InterviewQuestionOutput> {
  return generateInterviewQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'interviewQuestionPrompt',
  input: {schema: InterviewQuestionInputSchema},
  output: {schema: InterviewQuestionOutputSchema},
  prompt: `You are an expert career coach specializing in UX roles. Generate interview questions tailored to the user's portfolio.

Portfolio Description: {{{portfolioDescription}}}

Generate interview questions that assess the candidate's skills, experience, and project understanding based on their portfolio. Return the questions in JSON array format.
`,
});

const generateInterviewQuestionsFlow = ai.defineFlow(
  {
    name: 'generateInterviewQuestionsFlow',
    inputSchema: InterviewQuestionInputSchema,
    outputSchema: InterviewQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
