export const commonIssues = [
  "Waktu tunggu yang lama pada jam sibuk",
  "Layanan atau produk tidak lengkap",
  "Staf tampak terburu-buru dan sibuk",
  "Petunjuk atau informasi tidak jelas",
  "Sulit menghubungi unit layanan melalui telepon",
];

export const pastRatings = [
  { aspect: "Kecepatan Layanan", rating: 2 },
  { aspect: "Kelengkapan Layanan", rating: 4 },
];

export interface UnitReview {
  id: string;
  user: string;
  date: string;
  ratings: {
    serviceSpeed: number; // 1-3 (slow, medium, fast) but we'll use 1-5 scale for avg
    serviceQuality: number;
    serviceCompleteness: number; // 1-5 scale
    staffFriendliness: number;
  };
  comments: string;
}

export const unitReviews: UnitReview[] = [
  {
    id: "rev-1",
    user: "Pengguna Zero",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      serviceSpeed: 2, // slow
      serviceQuality: 4,
      serviceCompleteness: 5,
      staffFriendliness: 5,
    },
    comments: "Staf sangat membantu dan ramah, tapi saya harus menunggu hampir 45 menit untuk dilayani.",
  },
  {
    id: "rev-2",
    user: "Jane Doe",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      serviceSpeed: 5, // fast
      serviceQuality: 5,
      serviceCompleteness: 3,
      staffFriendliness: 5,
    },
    comments: "Pelayanan yang sangat baik dan cepat! Namun, salah satu item yang saya butuhkan tidak tersedia.",
  },
  {
    id: "rev-3",
    user: "John Smith",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      serviceSpeed: 3, // medium
      serviceQuality: 3,
      serviceCompleteness: 5,
      staffFriendliness: 2,
    },
    comments: "Waktu tunggunya oke, tapi stafnya terkesan agak acuh dan tidak menjelaskan informasi dengan jelas.",
  },
    {
    id: "rev-4",
    user: "Emily White",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      serviceSpeed: 5,
      serviceQuality: 5,
      serviceCompleteness: 5,
      staffFriendliness: 5,
    },
    comments: "Pengalaman yang sempurna. Cepat, ramah, dan semuanya tersedia. Staf memberi saya informasi yang bagus.",
  },
   {
    id: "rev-5",
    user: "Michael Brown",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    ratings: {
      serviceSpeed: 1,
      serviceQuality: 2,
      serviceCompleteness: 2,
      staffFriendliness: 1,
    },
    comments: "Menunggu sangat lama, layanan yang saya butuhkan tidak lengkap, dan staf tidak membantu. Pengalaman yang sangat membuat frustrasi secara keseluruhan.",
  },
];
