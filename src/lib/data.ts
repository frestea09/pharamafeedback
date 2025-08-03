
export interface RawUnitReview {
  id: string;
  user: string;
  date: string;
  unit: string;
  serviceSpeed: 'slow' | 'medium' | 'fast';
  serviceQuality: number;
  staffFriendliness: number;
  comments: string;
  rawCompleteness: 'complete' | 'incomplete' | 'not_applicable';
}

export const initialReviews: RawUnitReview[] = [];
