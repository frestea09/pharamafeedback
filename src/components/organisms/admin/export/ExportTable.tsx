
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { UnitReview } from '@/store/reviewStore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { getRatingColor } from '@/lib/utils';

const getSpeedBadgeText = (speed: 'slow' | 'medium' | 'fast') => {
    const map = { slow: 'Lambat', medium: 'Sedang', fast: 'Cepat' };
    return map[speed] || 'N/A';
};

export function ExportTable({ reviews }: { reviews: UnitReview[] }) {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">Detail Ulasan</h2>
            <div className="border rounded-lg border-gray-300">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-[120px]">Tanggal</TableHead>
                            <TableHead>Pengguna</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead className="text-center">Kualitas</TableHead>
                            <TableHead className="text-center">Keramahan</TableHead>
                            <TableHead className="text-center">Kecepatan</TableHead>
                            <TableHead>Komentar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>{format(new Date(review.date), "d MMM yy", { locale: id })}</TableCell>
                                    <TableCell className="font-medium">{review.user}</TableCell>
                                    <TableCell>{review.unit}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={getRatingColor(review.ratings.serviceQuality)}>{review.ratings.serviceQuality}/5</Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={getRatingColor(review.ratings.staffFriendliness)}>{review.ratings.staffFriendliness}/5</Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">{getSpeedBadgeText(review.ratings.serviceSpeed)}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-700">{review.comments || '-'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center h-24 text-gray-500">
                                    Tidak ada data ulasan untuk kriteria yang dipilih.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
}
