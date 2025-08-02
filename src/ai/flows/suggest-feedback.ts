'use server';

/**
 * @fileOverview File ini berisi alur Genkit untuk memberikan saran ulasan kepada pengguna.
 *
 * - suggestFeedback - Sebuah fungsi yang menyarankan umpan balik berdasarkan pengalaman masa lalu.
 * - SuggestFeedbackInput - Tipe input untuk fungsi suggestFeedback.
 * - SuggestFeedbackOutput - Tipe output untuk fungsi suggestFeedback.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFeedbackInputSchema = z.object({
  pastRatings: z
    .array(z.object({aspect: z.string(), rating: z.number()}))
    .optional()
    .describe('Array opsional dari peringkat masa lalu untuk berbagai aspek layanan.'),
  commonIssues: z
    .array(z.string())
    .optional()
    .describe('Array opsional dari masalah umum yang dilaporkan oleh pengguna lain.'),
});
export type SuggestFeedbackInput = z.infer<typeof SuggestFeedbackInputSchema>;

const SuggestFeedbackOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('Array dari prompt umpan balik yang disarankan untuk pengguna.'),
});
export type SuggestFeedbackOutput = z.infer<typeof SuggestFeedbackOutputSchema>;

export async function suggestFeedback(input: SuggestFeedbackInput): Promise<SuggestFeedbackOutput> {
  return suggestFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFeedbackPrompt',
  input: {schema: SuggestFeedbackInputSchema},
  output: {schema: SuggestFeedbackOutputSchema},
  prompt: `Anda adalah asisten AI yang dirancang untuk membantu pengguna dengan cepat memberikan umpan balik tentang pengalaman mereka di unit layanan.

  Berdasarkan informasi berikut, sarankan prompt umpan balik yang dapat digunakan pengguna untuk melengkapi ulasan mereka.

  Peringkat Sebelumnya:
  {{#if pastRatings}}
    {{#each pastRatings}}
      - Aspek: {{this.aspect}}, Peringkat: {{this.rating}}
    {{/each}}
  {{else}}
    Tidak ada peringkat sebelumnya yang tersedia.
  {{/if}}

  Masalah Umum:
  {{#if commonIssues}}
    {{#each commonIssues}}
      - {{this}}
    {{/each}}
  {{else}}
    Tidak ada masalah umum yang dilaporkan.
  {{/if}}

  Saran harus ringkas dan dapat ditindaklanjuti. Fokus pada mendorong pengguna untuk menguraikan aspek-aspek spesifik dari pengalaman mereka.
  Kembalikan saran dalam format array dan dalam Bahasa Indonesia.
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
