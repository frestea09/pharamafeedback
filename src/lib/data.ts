export const commonIssues = [
  "Waktu tunggu yang lama pada jam sibuk",
  "Obat habis",
  "Staf tampak terburu-buru dan sibuk",
  "Petunjuk penggunaan obat tidak jelas",
  "Sulit menghubungi apotek melalui telepon",
];

export const pastRatings = [
  { aspect: "Waktu Tunggu", rating: 2 },
  { aspect: "Ketersediaan Obat", rating: 4 },
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
    patient: "Pasien Zero",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      waitTime: 2,
      serviceQuality: 4,
      medicationAvailability: 5,
      staffFriendliness: 5,
    },
    comments: "Apoteker sangat membantu dan ramah, tapi saya harus menunggu hampir 45 menit untuk mendapatkan resep saya.",
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
    comments: "Pelayanan yang sangat baik dan cepat! Namun, salah satu obat resep saya habis dan saya diminta kembali besok.",
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
    comments: "Waktu tunggunya oke, tapi stafnya terkesan agak acuh dan tidak menjelaskan dosis obat dengan jelas.",
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
    comments: "Pengalaman yang sempurna. Cepat, ramah, dan semuanya tersedia. Apoteker memberi saya nasihat yang bagus.",
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
    comments: "Menunggu sangat lama, obat yang saya butuhkan tidak tersedia, dan staf tidak membantu. Pengalaman yang sangat membuat frustrasi secara keseluruhan.",
  },
];
