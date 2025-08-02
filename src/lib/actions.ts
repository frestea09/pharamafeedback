"use server";

import { guideReviewProcess } from "@/ai/flows/guide-review-process";
import { suggestFeedback } from "@/ai/flows/suggest-feedback";
import { commonIssues, pastRatings } from "@/lib/data";
import type { GuideReviewProcessInput, SuggestFeedbackInput } from "@/ai/flows/guide-review-process";

/**
 * Calls the Genkit AI flow to get review suggestions.
 * In a real application, you would fetch user-specific data here.
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
    console.error("Error getting review suggestions:", error);
    return [];
  }
}

/**
 * Calls the Genkit AI flow to get guidance for a specific review aspect.
 * @param aspect The pharmacy service aspect the user is reviewing.
 */
export async function getReviewGuidance(aspect: string) {
  try {
    const input: GuideReviewProcessInput = { aspect };
    const result = await guideReviewProcess(input);
    return result.guidance;
  } catch (error) {
    console.error(`Error getting guidance for ${aspect}:`, error);
    return "Could not load guidance at this time.";
  }
}
