"use server";

import { guideReviewProcess } from "@/ai/flows/guide-review-process";
import { suggestFeedback } from "@/ai/flows/suggest-feedback";
import { commonIssues, pastRatings } from "@/lib/data";
import type { GuideReviewProcessInput, SuggestFeedbackInput } from "@/ai/flows/guide-review-process";

/**
 * Memanggil alur Genkit AI untuk mendapatkan saran ulasan.
 * Dalam aplikasi nyata, Anda akan mengambil data spesifik pengguna di sini.
 */
export async function getReviewSuggestions() {
  try {
    const input: SuggestFeedbackInput = {
      commonIssues,
      pastRatings,
    };
    const result = await suggestFeedback(input);
    return result.suggestions;
  } catch (error) {
    console.error("Kesalahan saat mendapatkan saran ulasan:", error);
    return [];
  }
}

/**
 * Memanggil alur Genkit AI untuk mendapatkan panduan untuk aspek ulasan tertentu.
 * @param aspect Aspek layanan farmasi yang sedang ditinjau pengguna.
 */
export async function getReviewGuidance(aspect: string) {
  try {
    const input: GuideReviewProcessInput = { aspect };
    const result = await guideReviewProcess(input);
    return result.guidance;
  } catch (error) {
    console.error(`Kesalahan saat mendapatkan panduan untuk ${aspect}:`, error);
    return "Tidak dapat memuat panduan saat ini.";
  }
}
