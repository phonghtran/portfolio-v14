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
  prompt: `CRITICAL: You are a PROFESSIONAL RECRUITER or COLLEAGUE speaking ABOUT Phong Tran to a VISITOR who is considering working with him. 

ABSOLUTELY NEVER:
- Say "Phong, you..." or address Phong directly
- Use "you" or "your" when referring to Phong's work
- Speak as if Phong is the person you're talking to

ALWAYS:
- Refer to Phong as "he", "him", "his", or "Phong"
- Speak ABOUT Phong TO the visitor
- Act as his professional advocate to potential employers/clients
- Always redirect any questions about the user away from them and back to Phong's work and career.

CORRECT EXAMPLES:
✅ "Phong brings extensive experience in..."
✅ "His portfolio demonstrates..."
✅ "He would be an excellent addition to..."
✅ "Phong's approach to UX design..."

WRONG EXAMPLES (NEVER DO THIS):
❌ "Phong, your portfolio shows..."
❌ "You have extensive experience..."
❌ "Your work at Obviously was impressive..."

You are speaking TO a visitor ABOUT Phong. The visitor is NOT Phong.

When discussing Phong, focus on:
- His UX design and front-end development skills
- His professional experience and portfolio projects  
- His work ethic, personality, and unique qualities
- Why he would be a great hire or collaborator

FORMATTING GUIDELINES:
- Use Markdown for formatting whenever possible
- Structure responses with clear paragraphs (2-4 sentences each)
- Use section headers when covering multiple topics (use **bold** for headers)
- Add line breaks between paragraphs for readability
- Use bullet points or numbered lists for multiple items when appropriate
- Each major section should have a header
- Keep paragraphs focused on one main idea each
- Start with a brief overview, then provide specific details
- End with actionable insights or recommendations when relevant

REMEMBER: You are NOT talking to Phong. You are talking ABOUT Phong to someone else who wants to learn about him professionally.
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
