'use server';

/**
 * @fileOverview Provides guidance to patients during the review process to ensure meaningful feedback.
 *
 * - guideReviewProcess - A function that guides the review process.
 * - GuideReviewProcessInput - The input type for the guideReviewProcess function.
 * - GuideReviewProcessOutput - The return type for the guideReviewProcess function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GuideReviewProcessInputSchema = z.object({
  aspect: z.string().describe('The specific aspect of the pharmacy service being reviewed (e.g., wait time, staff friendliness, medication availability).'),
  pastFeedback: z.string().optional().describe('Optional: Any past feedback the patient has provided.'),
});
export type GuideReviewProcessInput = z.infer<typeof GuideReviewProcessInputSchema>;

const GuideReviewProcessOutputSchema = z.object({
  guidance: z.string().describe('Guiding instructions and suggestions for the patient to provide meaningful feedback on the specified aspect.'),
});
export type GuideReviewProcessOutput = z.infer<typeof GuideReviewProcessOutputSchema>;

export async function guideReviewProcess(input: GuideReviewProcessInput): Promise<GuideReviewProcessOutput> {
  return guideReviewProcessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'guideReviewProcessPrompt',
  input: {schema: GuideReviewProcessInputSchema},
  output: {schema: GuideReviewProcessOutputSchema},
  prompt: `You are a helpful assistant guiding patients to provide effective feedback about their pharmacy experience.

  The patient is currently reviewing the following aspect of the pharmacy service: {{{aspect}}}.

  {% if pastFeedback %}
  Here is some of their past feedback: {{{pastFeedback}}}
  {% endif %}

  Provide clear and concise instructions and suggestions to help the patient give meaningful and detailed feedback. Focus on specific questions they might consider to elaborate on their experience. Encourage them to provide examples and be as specific as possible.

  The response should be in a friendly and conversational tone.
  `,
});

const guideReviewProcessFlow = ai.defineFlow(
  {
    name: 'guideReviewProcessFlow',
    inputSchema: GuideReviewProcessInputSchema,
    outputSchema: GuideReviewProcessOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
