
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


export const initialReviews: RawUnitReview[] = [
   {
    id: "rev-1",
    user: "Pengguna Zero",
    unit: "Farmasi",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    rawCompleteness: 'complete',
    comments: "Staf sangat membantu dan ramah, tapi saya harus menunggu hampir 45 menit untuk dilayani.",
    serviceSpeed: 'slow',
    serviceQuality: 4,
    staffFriendliness: 5,
  },
  {
    id: "rev-2",
    user: "Jane Doe",
    unit: "Rawat Jalan",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    rawCompleteness: 'incomplete',
    comments: "Pelayanan yang sangat baik dan cepat! Namun, salah satu item yang saya butuhkan tidak tersedia.",
    serviceSpeed: 'fast',
    serviceQuality: 5,
    staffFriendliness: 5,
  },
  {
    id: "rev-3",
    user: "John Smith",
    unit: "Laboratorium",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    rawCompleteness: 'complete',
    comments: "Waktu tunggunya oke, tapi stafnya terkesan agak acuh dan tidak menjelaskan informasi dengan jelas.",
    serviceSpeed: 'medium',
    serviceQuality: 3,
    staffFriendliness: 2,
  },
    {
    id: "rev-4",
    user: "Emily White",
    unit: "Farmasi",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    rawCompleteness: 'complete',
    comments: "Pengalaman yang sempurna. Cepat, ramah, dan semuanya tersedia. Staf memberi saya informasi yang bagus.",
    serviceSpeed: 'fast',
    serviceQuality: 5,
    staffFriendliness: 5,
  },
   {
    id: "rev-5",
    user: "Michael Brown",
    unit: "Rawat Jalan",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    rawCompleteness: 'incomplete',
    comments: "Menunggu sangat lama, layanan yang saya butuhkan tidak lengkap, dan staf tidak membantu. Pengalaman yang sangat membuat frustrasi secara keseluruhan.",
    serviceSpeed: 'slow',
    serviceQuality: 2,
    staffFriendliness: 1,
  },
];
