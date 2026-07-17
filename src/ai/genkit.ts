import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  // Gemini 3.5 Flash (GA) — fast + cheap, ample quality for a portfolio bot.
  // Swap to googleAI.model('gemini-3.1-pro-preview') for max answer quality.
  model: googleAI.model('gemini-3.5-flash'),
});
