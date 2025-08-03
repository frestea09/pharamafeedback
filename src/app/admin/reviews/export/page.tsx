
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useReviewStore, UnitReview } from '@/store/reviewStore';
import { useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format, startOfDay, endOfDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { TestTube, Printer } from 'lucide-react';

const getRatingColor = (rating: number) => {
    if (rating < 3) return "destructive";
    if (rating < 4) return "secondary";
    return "default";
};

const getSpeedBadgeText = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
        case 'slow': return 'Lambat';
        case 'medium': return 'Sedang';
        case 'fast': return 'Cepat';
        default: return 'N/A';
    }
};

const getCompletenessBadgeText = (status: 'complete' | 'incomplete' | 'not_applicable') => {
    switch(status) {
        case 'complete': return 'Lengkap';
        case 'incomplete': return 'Tidak Lengkap';
        default: return 'Tidak Tahu';
    }
};

const calculateAverages = (reviews: UnitReview[]) => {
    if (!reviews.length) return { quality: 0, friendliness: 0 };
    const totalQuality = reviews.reduce((sum, r) => sum + r.ratings.serviceQuality, 0);
    const totalFriendliness = reviews.reduce((sum, r) => sum + r.ratings.staffFriendliness, 0);
    return {
        quality: totalQuality / reviews.length,
        friendliness: totalFriendliness / reviews.length,
    };
};

export default function ExportPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { reviews } = useReviewStore();

    const unit = searchParams.get('unit') || 'Semua Unit';
    const userFilter = searchParams.get('user') || '';
    const dateFrom = searchParams.get('from');
    const dateTo = searchParams.get('to');

    const filteredReviews = useMemo(() => {
        let tempReviews = reviews;

        if (unit && unit !== 'Semua Unit') {
            tempReviews = tempReviews.filter(r => r.unit === unit);
        }

        if (userFilter) {
            tempReviews = tempReviews.filter(r => r.user.toLowerCase().includes(userFilter.toLowerCase()));
        }

        if (dateFrom) {
            tempReviews = tempReviews.filter(r => new Date(r.date) >= startOfDay(new Date(dateFrom)));
        }

        if (dateTo) {
            tempReviews = tempReviews.filter(r => new Date(r.date) <= endOfDay(new Date(dateTo)));
        }

        return tempReviews;
    }, [reviews, unit, userFilter, dateFrom, dateTo]);

    const averages = calculateAverages(filteredReviews);

    const dateRange = dateFrom && dateTo 
        ? `${format(new Date(dateFrom), 'd MMM yyyy', { locale: id })} - ${format(new Date(dateTo), 'd MMM yyyy', { locale: id })}`
        : 'Semua Waktu';
    
    // Automatically trigger print dialog when component mounts
    useEffect(() => {
        setTimeout(() => window.print(), 500);
    }, []);

    return (
        <div className="bg-white text-black p-8" id="export-content">
            <style jsx global>{`
                @media print {
                    body {
                        background-color: #fff;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .no-print {
                        display: none;
                    }
                    @page {
                        size: A4;
                        margin: 20mm;
                    }
                }
            `}</style>

            <header className="flex justify-between items-center pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <TestTube className="h-10 w-10 text-green-500" />
                    <div>
                        <h1 className="text-2xl font-bold">Laporan Ulasan PharmaFeedback</h1>
                        <p className="text-gray-500">Dicetak pada: {format(new Date(), 'd MMMM yyyy, HH:mm', { locale: id })}</p>
                    </div>
                </div>
                <div className="no-print">
                    <Button onClick={() => window.print()}><Printer className="mr-2" />Cetak Laporan</Button>
                </div>
            </header>

            <main className="my-8">
                <Card className="mb-8 border-gray-300 shadow-none">
                    <CardHeader>
                        <CardTitle>Ringkasan Laporan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-semibold">Unit Layanan:</p>
                            <p>{unit}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Periode Laporan:</p>
                            <p>{dateRange}</p>
                        </div>
                        <div>
                            <p className="font-semibold">Filter Pengguna:</p>
                            <p>{userFilter || 'Tidak ada'}</p>
                        </div>
                         <div>
                            <p className="font-semibold">Total Ulasan:</p>
                            <p>{filteredReviews.length} ulasan</p>
                        </div>
                        <div>
                            <p className="font-semibold">Rata-rata Kualitas:</p>
                            <p>{averages.quality.toFixed(1)} / 5.0</p>
                        </div>
                        <div>
                            <p className="font-semibold">Rata-rata Keramahan:</p>
                            <p>{averages.friendliness.toFixed(1)} / 5.0</p>
                        </div>
                    </CardContent>
                </Card>

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
                            {filteredReviews.length > 0 ? (
                                filteredReviews.map((review) => (
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
            </main>

            <footer className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
                <p>&copy; {new Date().getFullYear()} PharmaFeedback | Laporan Internal</p>
            </footer>
        </div>
    );
}
