import { config } from 'dotenv';
config();

// Register the flow used by the site's chat so it appears in the Genkit dev UI.
import '@/ai/flows/personalized-follow-up-responses.ts';
