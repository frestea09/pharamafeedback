
import { create } from 'zustand';
import { initialReviews, RawUnitReview } from '@/lib/data';

export interface UnitReview {
  id: string;
  user: string;
  date: string;
  unit: string;
  ratings: {
    serviceSpeed: 'slow' | 'medium' | 'fast';
    serviceQuality: number;
    staffFriendliness: number;
  };
  comments: string;
  rawCompleteness: 'complete' | 'incomplete' | 'not_applicable';
}

const processReviews = (reviews: RawUnitReview[]): UnitReview[] => {
  return reviews.map(r => ({
    ...r,
    ratings: {
      serviceSpeed: r.serviceSpeed,
      serviceQuality: r.serviceQuality,
      staffFriendliness: r.staffFriendliness,
    }
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

interface ReviewState {
  reviews: UnitReview[];
  addReview: (review: RawUnitReview) => void;
  deleteReview: (reviewId: string) => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  reviews: processReviews(initialReviews),
  addReview: (review) => {
    const processedNewReview = processReviews([review])[0];
    set((state) => ({
      reviews: [processedNewReview, ...state.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    }));
  },
  deleteReview: (reviewId) => {
    set((state) => ({
      reviews: state.reviews.filter((review) => review.id !== reviewId),
    }));
  },
}));
