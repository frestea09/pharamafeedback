'use server';

/**
 * @fileOverview Meringkas ulasan unit layanan dan memberikan rekomendasi.
 *
 * - summarizeReviews - Sebuah fungsi yang meringkas ulasan dan memberikan rekomendasi.
 * - SummarizeReviewsInput - Tipe input untuk fungsi summarizeReviews.
 * - SummarizeReviewsOutput - Tipe kembalian untuk fungsi summarizeReviews.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReviewSchema = z.object({
  id: z.string(),
  user: z.string(),
  date: z.string(),
  ratings: z.object({
    serviceSpeed: z.enum(['slow', 'medium', 'fast']),
    serviceQuality: z.number(),
    serviceCompleteness: z.enum(['complete', 'incomplete', 'not_applicable']),
    staffFriendliness: z.number(),
  }),
  comments: z.string(),
});

const SummarizeReviewsInputSchema = z.object({
  reviews: z.array(ReviewSchema).describe('Array dari objek ulasan yang akan diringkas.'),
});
export type SummarizeReviewsInput = z.infer<typeof SummarizeReviewsInputSchema>;

const SummarizeReviewsOutputSchema = z.object({
  summary: z.string().describe('Ringkasan umum dari umpan balik yang diterima.'),
  recommendations: z.array(z.string()).describe('Array dari rekomendasi yang dapat ditindaklanjuti untuk peningkatan layanan.'),
});
export type SummarizeReviewsOutput = z.infer<typeof SummarizeReviewsOutputSchema>;

export async function summarizeReviews(input: SummarizeReviewsInput): Promise<SummarizeReviewsOutput> {
  return summarizeReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeReviewsPrompt',
  input: {schema: SummarizeReviewsInputSchema},
  output: {schema: SummarizeReviewsOutputSchema},
  prompt: `Anda adalah seorang analis data yang bertugas menganalisis umpan balik dari pengguna untuk sebuah unit layanan.
  Berdasarkan ulasan berikut, berikan ringkasan umum dan daftar rekomendasi yang dapat ditindaklanjuti.

  Ulasan:
  {{{json reviews}}}

  Fokus pada tren yang muncul, masalah yang berulang, dan area-area yang berkinerja baik.
  Rekomendasi harus spesifik dan praktis.
  Respons harus dalam Bahasa Indonesia.
  `,
});

const summarizeReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeReviewsFlow',
    inputSchema: SummarizeReviewsInputSchema,
    outputSchema: SummarizeReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
