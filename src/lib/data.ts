
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


export const initialReviews: RawUnitReview[] = [];
