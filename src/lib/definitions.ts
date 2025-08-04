
import type { Review, User } from '@prisma/client';

// This type includes the related user data for display purposes
export type UnitReview = Review & {
  user: {
    name: string;
    avatar: string | null;
  };
};
