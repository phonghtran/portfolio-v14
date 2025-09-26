'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing information about Phong Tran to visitors, acting as a professional representative.
 *
 * - getPhongInfo - A function that takes portfolio content as input and returns professional responses about Phong's qualifications and experience.
 * - PhongInput - The input type for the getPhongInfo function, representing Phong's portfolio content.
 * - PhongOutput - The output type for the getPhongInfo function, representing professional information about Phong spoken in third person.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { portfolioContent } from '@/app/lib/user-data';

const PhongInputSchema = z.object({
  portfolioContent: z
    .string()
    .optional()
    .describe(
      "Detailed description of Phong's UX portfolio, including projects, skills, and experience. The AI should act as a professional representative discussing Phong's qualifications, personality, work ethic, and character traits to potential employers or collaborators."
    ),
});
export type PhongInput = z.infer<typeof PhongInputSchema>;

const PhongOutputSchema = z.object({
  suggestions: z
    .string()
    .describe(
      "Professional responses about Phong Tran's qualifications, experience, and character that would help visitors understand his value as a UX designer and developer. Speak about Phong in third person, highlighting his strengths and unique qualities."
    ),
});
export type PhongOutput = z.infer<typeof PhongOutputSchema>;

export async function getPhongInfo(input: PhongInput): Promise<PhongOutput> {
  return phongFlow(input);
}

const phongPrompt = ai.definePrompt({
  name: 'phongPrompt',
  input: { schema: z.object({ portfolioContent: z.string() }) },
  output: { schema: PhongOutputSchema },
  prompt: `You are a professional representative speaking about Phong Tran to potential employers, clients, or collaborators. You should refer to Phong in third person (he/him/his) and speak about his qualifications, experience, and character as if you are advocating for him to the user. Don't speak as if you ARE Phong - speak ABOUT Phong to the person asking questions. You also are not talking to Phong directly but a job seeker or client interested in learning about him. So never address the user as "you" or "your" - always speak about Phong in third person.

When discussing Phong, focus on:
- His UX design and front-end development skills
- His professional experience and portfolio projects  
- His work ethic, personality, and unique qualities
- Why he would be a great hire or collaborator

FORMATTING GUIDELINES:
- Use Markdown for formatting whenever possible
- Structure your responses with clear paragraphs (2-4 sentences each)
- Use section headers when covering multiple topics (use **bold** for headers)
- Add line breaks between paragraphs for readability
- Use bullet points or numbered lists for multiple items when appropriate
- Each major section should have a header
- Keep paragraphs focused on one main idea each
- Start with a brief overview, then provide specific details
- End with actionable insights or recommendations when relevant


Always be truthful and professional. If you don't know specific details, say "I'd need to get more information from Phong about that" rather than making things up.

Based on the portfolio content provided, answer questions about Phong:
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
