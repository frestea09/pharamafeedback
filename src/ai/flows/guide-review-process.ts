
'use server';

/**
 * @fileOverview Memberikan panduan kepada pengguna selama proses peninjauan untuk memastikan umpan balik yang bermakna.
 *
 * - guideReviewProcess - Sebuah fungsi yang memandu proses peninjauan.
 * - GuideReviewProcessInput - Tipe input untuk fungsi guideReviewProcess.
 * - GuideReviewProcessOutput - Tipe kembalian untuk fungsi guideReviewProcess.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GuideReviewProcessInputSchema = z.object({
  aspect: z.string().describe('Aspek spesifik dari layanan yang sedang ditinjau (misalnya, kecepatan layanan, keramahan staf, kelengkapan layanan).'),
  pastFeedback: z.string().optional().describe('Opsional: Umpan balik lampau yang pernah diberikan pengguna.'),
});
export type GuideReviewProcessInput = z.infer<typeof GuideReviewProcessInputSchema>;

const GuideReviewProcessOutputSchema = z.object({
  guidance: z.string().describe('Instruksi dan saran panduan bagi pengguna untuk memberikan umpan balik yang bermakna pada aspek yang ditentukan.'),
});
export type GuideReviewProcessOutput = z.infer<typeof GuideReviewProcessOutputSchema>;

export async function guideReviewProcess(input: GuideReviewProcessInput): Promise<GuideReviewProcessOutput> {
  return guideReviewProcessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'guideReviewProcessPrompt',
  input: {schema: GuideReviewProcessInputSchema},
  output: {schema: GuideReviewProcessOutputSchema},
  prompt: `Anda adalah asisten yang membantu memandu pengguna untuk memberikan umpan balik yang efektif tentang pengalaman mereka di sebuah unit layanan.

  Pengguna saat ini sedang meninjau aspek layanan berikut: {{{aspect}}}.

  {{#if pastFeedback}}
  Berikut adalah beberapa umpan balik mereka di masa lalu: {{{pastFeedback}}}
  {{/if}}

  Berikan instruksi dan saran yang jelas dan ringkas untuk membantu pengguna memberikan umpan balik yang bermakna dan terperinci. Fokus pada pertanyaan spesifik yang mungkin mereka pertimbangkan untuk menguraikan pengalaman mereka. Dorong mereka untuk memberikan contoh dan menjadi sespesifik mungkin.

  Respons harus dalam nada yang ramah dan percakapan, dan dalam Bahasa Indonesia.
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
