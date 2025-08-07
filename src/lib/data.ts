
import { UnitReview } from "./definitions";

// This type is used for the array implementation
export type RawUnitReview = Omit<UnitReview, 'user'> & {
  userId: string;
};

export const initialReviews: RawUnitReview[] = [
    {
        id: 'review-1',
        userId: 'user-budi',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        unit: 'GF - Instalasi Farmasi (Gedung Utama)',
        serviceSpeed: 'fast',
        serviceQuality: 5,
        staffFriendliness: 4,
        comments: 'Pelayanan sangat cepat dan stafnya ramah. Obat yang diberikan juga lengkap.',
        rawCompleteness: 'complete',
        createdAt: new Date(),
        updatedAt: new Date(),
        serviceQualityNew: null,
        staffFriendlinessNew: null,
    },
    {
        id: 'review-2',
        userId: 'user-ani',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        unit: 'L2 - Ruang Perawatan Anak Anyelir',
        serviceSpeed: 'medium',
        serviceQuality: 4,
        staffFriendliness: 5,
        comments: 'Perawat sangat sabar dan baik kepada anak saya. Ruangan juga bersih.',
        rawCompleteness: 'complete',
        createdAt: new Date(),
        updatedAt: new Date(),
        serviceQualityNew: null,
        staffFriendlinessNew: null,
    },
    {
        id: 'review-3',
        userId: 'user-budi',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        unit: 'L1 - Instalasi Laboratorium',
        serviceSpeed: 'slow',
        serviceQuality: 3,
        staffFriendliness: 4,
        comments: 'Menunggu hasil lab cukup lama, tapi petugasnya informatif.',
        rawCompleteness: 'complete',
        createdAt: new Date(),
        updatedAt: new Date(),
        serviceQualityNew: null,
        staffFriendlinessNew: null,
    }
];
