'use server';

/**
 * @fileOverview This file contains the Genkit flow for providing review suggestions to patients.
 *
 * - suggestFeedback - A function that suggests feedback based on past experiences.
 * - SuggestFeedbackInput - The input type for the suggestFeedback function.
 * - SuggestFeedbackOutput - The output type for the suggestFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFeedbackInputSchema = z.object({
  pastRatings: z
    .array(z.object({aspect: z.string(), rating: z.number()}))
    .optional()
    .describe('An optional array of past ratings for different aspects of the pharmacy.'),
  commonIssues: z
    .array(z.string())
    .optional()
    .describe('An optional array of common issues reported by other patients.'),
});
export type SuggestFeedbackInput = z.infer<typeof SuggestFeedbackInputSchema>;

const SuggestFeedbackOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested feedback prompts for the patient.'),
});
export type SuggestFeedbackOutput = z.infer<typeof SuggestFeedbackOutputSchema>;

export async function suggestFeedback(input: SuggestFeedbackInput): Promise<SuggestFeedbackOutput> {
  return suggestFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFeedbackPrompt',
  input: {schema: SuggestFeedbackInputSchema},
  output: {schema: SuggestFeedbackOutputSchema},
  prompt: `You are an AI assistant designed to help patients quickly provide feedback about their pharmacy experience.

  Based on the following information, suggest feedback prompts that the patient can use to complete their review.

  Past Ratings:
  {{#if pastRatings}}
    {{#each pastRatings}}
      - Aspect: {{this.aspect}}, Rating: {{this.rating}}
    {{/each}}
  {{else}}
    No past ratings available.
  {{/if}}

  Common Issues:
  {{#if commonIssues}}
    {{#each commonIssues}}
      - {{this}}
    {{/each}}
  {{else}}
    No common issues reported.
  {{/if}}

  Suggestions should be concise and actionable. Focus on prompting the user to elaborate on specific aspects of their experience.
  Return suggestions in array format.
  `, 
});

const suggestFeedbackFlow = ai.defineFlow(
  {
    name: 'suggestFeedbackFlow',
    inputSchema: SuggestFeedbackInputSchema,
    outputSchema: SuggestFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
