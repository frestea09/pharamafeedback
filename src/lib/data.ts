export const commonIssues = [
  "Long wait times during peak hours",
  "Medication was out of stock",
  "Staff seemed rushed and busy",
  "Instructions for medication were not clear",
  "Difficulty reaching the pharmacy by phone",
];

export const pastRatings = [
  { aspect: "Wait Time", rating: 2 },
  { aspect: "Medication Availability", rating: 4 },
];

export interface PharmacyReview {
  id: string;
  patient: string;
  date: string;
  ratings: {
    waitTime: number;
    serviceQuality: number;
    medicationAvailability: number;
    staffFriendliness: number;
  };
  comments: string;
}

export const pharmacyReviews: PharmacyReview[] = [
  {
    id: "rev-1",
    patient: "Patient Zero",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      waitTime: 2,
      serviceQuality: 4,
      medicationAvailability: 5,
      staffFriendliness: 5,
    },
    comments: "The pharmacist was very helpful and friendly, but I had to wait for almost 45 minutes to get my prescription.",
  },
  {
    id: "rev-2",
    patient: "Jane Doe",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      waitTime: 5,
      serviceQuality: 5,
      medicationAvailability: 3,
      staffFriendliness: 5,
    },
    comments: "Excellent and quick service! However, one of my prescribed medications was out of stock and I was told to come back tomorrow.",
  },
  {
    id: "rev-3",
    patient: "John Smith",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      waitTime: 3,
      serviceQuality: 3,
      medicationAvailability: 5,
      staffFriendliness: 2,
    },
    comments: "The wait time was okay, but the staff seemed a bit dismissive and didn't explain the medication dosage clearly.",
  },
    {
    id: "rev-4",
    patient: "Emily White",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      waitTime: 5,
      serviceQuality: 5,
      medicationAvailability: 5,
      staffFriendliness: 5,
    },
    comments: "A perfect experience. Fast, friendly, and everything was in stock. The pharmacist gave me great advice.",
  },
   {
    id: "rev-5",
    patient: "Michael Brown",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      waitTime: 1,
      serviceQuality: 2,
      medicationAvailability: 2,
      staffFriendliness: 1,
    },
    comments: "Very long wait, the medication I needed wasn't available, and the staff was unhelpful. A very frustrating experience overall.",
  },
];
