
"use client";

import React, { createContext, useState, ReactNode } from 'react';
import { initialReviews, RawUnitReview } from '@/lib/data';

// Mapping from the new string-based service speed to a numeric value for completeness rating
const completenessMapping: { [key: string]: number } = {
  'complete': 5,
  'incomplete': 1,
  'not_applicable': 3
};

export interface UnitReview {
  id: string;
  user: string;
  date: string;
  unit: string;
  ratings: {
    serviceSpeed: 'slow' | 'medium' | 'fast';
    serviceQuality: number;
    serviceCompleteness: number; // This will now be derived from the 'complete'/'incomplete'/'not_applicable'
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
      serviceCompleteness: completenessMapping[r.rawCompleteness]
    }
  })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

interface ReviewContextType {
  reviews: UnitReview[];
  addReview: (review: RawUnitReview) => void;
  deleteReview: (reviewId: string) => void;
}

export const ReviewContext = createContext<ReviewContextType>({
  reviews: [],
  addReview: () => {},
  deleteReview: () => {},
});

interface ReviewProviderProps {
  children: ReactNode;
}

export const ReviewProvider = ({ children }: ReviewProviderProps) => {
  const [rawReviews, setRawReviews] = useState<RawUnitReview[]>(initialReviews);

  const addReview = (review: RawUnitReview) => {
    setRawReviews(prevReviews => [review, ...prevReviews]);
  };

  const deleteReview = (reviewId: string) => {
    setRawReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
  };

  const processedReviews = processReviews(rawReviews);

  return (
    <ReviewContext.Provider value={{ reviews: processedReviews, addReview, deleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
};
