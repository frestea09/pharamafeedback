"use server";

import { guideReviewProcess } from "@/ai/flows/guide-review-process";
import { suggestFeedback } from "@/ai/flows/suggest-feedback";
import { summarizeReviews } from "@/ai/flows/summarize-reviews";
import { commonIssues, pastRatings, unitReviews } from "@/lib/data";
import type { SuggestFeedbackInput } from "@/ai/flows/suggest-feedback";
import type { GuideReviewProcessInput } from "@/ai/flows/guide-review-process";
import type { SummarizeReviewsInput } from "@/ai/flows/summarize-reviews";


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
 * @param aspect Aspek layanan yang sedang ditinjau pengguna.
 */
export async function getReviewGuidance(aspect: string) {
  try {
    const input: GuideReviewProcessInput = { aspect };
    const result = await guideReviewProcess(input);
    return result.guidance;
  } catch (error)
    {
    console.error(`Kesalahan saat mendapatkan panduan untuk ${aspect}:`, error);
    return "Tidak dapat memuat panduan saat ini.";
  }
}

/**
 * Memanggil alur Genkit AI untuk mendapatkan ringkasan dan rekomendasi untuk admin.
 */
export async function getAdminGuidance() {
    try {
        const input: SummarizeReviewsInput = { reviews: unitReviews };
        const result = await summarizeReviews(input);
        return result;
    } catch (error) {
        console.error("Kesalahan saat mendapatkan panduan admin:", error);
        return null;
    }
}
