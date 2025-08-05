
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { getRatingColor } from '@/lib/utils';
import { UnitReview } from '@/lib/definitions';

const getSpeedBadgeText = (speed: string) => {
    const map: Record<string, string> = { slow: 'Lambat', medium: 'Sedang', fast: 'Cepat' };
    return map[speed] || 'N/A';
};

export function ExportTable({ reviews }: { reviews: UnitReview[] }) {
    return (
        <>
            <h2 className="text-xl font-bold mb-4 print:text-lg">Detail Ulasan</h2>
            <div className="border rounded-lg border-gray-300">
                <Table className="print:text-[10px]">
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-[100px] print:p-2">Tanggal</TableHead>
                            <TableHead className="print:p-2">Pengguna</TableHead>
                            <TableHead className="print:p-2">Unit</TableHead>
                            <TableHead className="text-center print:p-2">Kualitas</TableHead>
                            <TableHead className="text-center print:p-2">Keramahan</TableHead>
                            <TableHead className="text-center print:p-2">Kecepatan</TableHead>
                            <TableHead className="print:p-2">Komentar</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <TableRow key={review.id} className="print:break-inside-avoid">
                                    <TableCell className="print:p-2">{format(new Date(review.date), "d MMM yy", { locale: id })}</TableCell>
                                    <TableCell className="font-medium print:p-2">{review.user.name}</TableCell>
                                    <TableCell className="print:p-2">{review.unit}</TableCell>
                                    <TableCell className="text-center print:p-2">
                                        <Badge variant={getRatingColor(review.serviceQuality)}>{review.serviceQuality}/5</Badge>
                                    </TableCell>
                                    <TableCell className="text-center print:p-2">
                                        <Badge variant={getRatingColor(review.staffFriendliness)}>{review.staffFriendliness}/5</Badge>
                                    </TableCell>
                                    <TableCell className="text-center print:p-2">
                                        <Badge variant="outline">{getSpeedBadgeText(review.serviceSpeed)}</Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-700 print:p-2 print:max-w-md">{review.comments || '-'}</TableCell>
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
