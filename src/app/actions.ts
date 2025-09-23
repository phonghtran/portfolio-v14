'use server';

import { personalizedFollowUp } from '@/ai/flows/personalized-follow-up-responses';
import type { PersonalizedFollowUpInput } from '@/ai/flows/personalized-follow-up-responses';

export async function getAiResponse(input: PersonalizedFollowUpInput) {
  try {
    const result = await personalizedFollowUp(input);
    return { success: true, response: result.response };
  } catch (error) {
    console.error('Error getting AI response:', error);
    return {
      success: false,
      error: 'Sorry, I encountered an error. Please try again.',
    };
  }
}
