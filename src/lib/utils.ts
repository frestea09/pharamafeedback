
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { UnitReview } from "@/lib/definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPageTitle = (pathname: string, unit: string | null = null): string => {
  const baseTitles: { [key: string]: string } = {
      "/admin/dashboard": "Dasbor Admin",
      "/admin/reviews": "Semua Ulasan",
      "/admin/users": "Kelola Pengguna",
      "/admin/faq": "Bantuan & Panduan",
      "/dashboard": "Formulir Ulasan Pasien",
      "/dashboard/history": "Riwayat Ulasan",
      "/faq": "Bantuan & Panduan"
  };

  if (pathname.startsWith('/admin/users/')) {
      const id = pathname.split('/').pop();
      return id === 'new' ? "Tambah Pengguna Baru" : "Ubah Detail Pengguna";
  }

  if (pathname.startsWith('/admin/reviews/export')) {
      return "Laporan Ulasan untuk Dicetak";
  }

  let baseTitle = baseTitles[pathname] || "LayananReview RSUD";

  if (unit && pathname.startsWith('/admin/')) {
    baseTitle = `${baseTitle} - Unit ${unit}`;
  }
  
  return baseTitle;
}

export const getRatingColor = (rating: number): "destructive" | "secondary" | "default" => {
  if (rating < 3) return "destructive";
  if (rating < 4) return "secondary";
  return "default";
};

export const calculateAverages = (reviews: UnitReview[]) => {
  const legacyReviews = reviews.filter(r => !r.serviceQualityNew);
  const newReviews = reviews.filter(r => r.serviceQualityNew);

  if (!reviews.length) return { quality: 0, friendliness: 0 };
  
  // Calculate for legacy (star-based) reviews
  const totalLegacyQuality = legacyReviews.reduce((sum, r) => sum + r.serviceQuality, 0);
  const totalLegacyFriendliness = legacyReviews.reduce((sum, r) => sum + r.staffFriendliness, 0);
  
  // Calculate for new (positive/negative) reviews, mapping positive to 5 and negative to 1
  const totalNewQuality = newReviews.reduce((sum, r) => sum + (r.serviceQualityNew === 'positive' ? 5 : 1), 0);
  const totalNewFriendliness = newReviews.reduce((sum, r) => sum + (r.staffFriendlinessNew === 'positive' ? 5 : 1), 0);

  const totalQuality = totalLegacyQuality + totalNewQuality;
  const totalFriendliness = totalLegacyFriendliness + totalNewFriendliness;

  return {
      quality: totalQuality / reviews.length,
      friendliness: totalFriendliness / reviews.length,
  };
};
