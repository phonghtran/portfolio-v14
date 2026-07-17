import { z } from 'genkit';
import { ai } from '@/ai/genkit';
import { getProjectKnowledge } from '@/app/lib/user-data';

/**
 * Lets the model pull a single project's full case-study write-up on demand,
 * instead of every write-up being stuffed into the base prompt. The available
 * project ids are listed in the system prompt's "Case Study Projects" index.
 */
export const getProjectDetails = ai.defineTool(
  {
    name: 'getProjectDetails',
    description:
      "Get the full case-study write-up for one of Phong's projects by its id " +
      '(the ids are listed in the Case Study Projects index in the system ' +
      'prompt). Call this before answering an in-depth question about a ' +
      'specific project.',
    inputSchema: z.object({
      projectId: z
        .string()
        .describe('The project id, e.g. "fanniemae-1" or "obviously-3".'),
    }),
    outputSchema: z.string(),
  },
  async ({ projectId }) => {
    return (
      getProjectKnowledge(projectId) ??
      `No project found with id "${projectId}". Check the Case Study Projects index for valid ids.`
    );
  }
);
