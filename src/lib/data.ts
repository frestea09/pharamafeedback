
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
    user: "Budi Santoso",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    unit: "Farmasi",
    serviceSpeed: "medium",
    serviceQuality: 4,
    staffFriendliness: 5,
    comments: "Pelayanannya bagus, stafnya ramah dan sangat membantu menjelaskan dosis obat.",
    rawCompleteness: "complete",
  },
  {
    id: "rev-2",
    user: "Citra Lestari",
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    unit: "Rawat Jalan",
    serviceSpeed: "slow",
    serviceQuality: 3,
    staffFriendliness: 4,
    comments: "Waktu tunggunya cukup lama, tapi dokternya sangat teliti.",
    rawCompleteness: "complete",
  },
  {
    id: "rev-3",
    user: "Dewi Anggraini",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    unit: "Farmasi",
    serviceSpeed: "fast",
    serviceQuality: 5,
    staffFriendliness: 5,
    comments: "Sangat cepat dan efisien! Obat yang saya butuhkan tersedia.",
    rawCompleteness: "complete",
  },
    {
    id: "rev-4",
    user: "Budi Santoso",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    unit: "Laboratorium",
    serviceSpeed: "medium",
    serviceQuality: 4,
    staffFriendliness: 4,
    comments: "Proses pengambilan sampel darah berjalan lancar.",
    rawCompleteness: "not_applicable",
  },
   {
    id: "rev-5",
    user: "Eko Prasetyo",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    unit: "Rawat Jalan",
    serviceSpeed: "medium",
    serviceQuality: 5,
    staffFriendliness: 5,
    comments: "Dokter dan perawat sangat profesional. Penjelasan mudah dimengerti.",
    rawCompleteness: "complete",
  },
];
