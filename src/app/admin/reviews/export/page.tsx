
"use client";

import { useSearchParams } from 'next/navigation';
import { useReviewStore, UnitReview } from '@/store/reviewStore';
import { useMemo, useEffect } from 'react';
import { format, startOfDay, endOfDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { ExportHeader } from '@/components/organisms/admin/export/ExportHeader';
import { ExportSummary } from '@/components/organisms/admin/export/ExportSummary';
import { ExportTable } from '@/components/organisms/admin/export/ExportTable';
import { calculateAverages } from '@/lib/utils';

export default function ExportPage() {
    const searchParams = useSearchParams();
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
            <ExportHeader />
            <main className="my-8">
                <ExportSummary
                    unit={unit}
                    dateRange={dateRange}
                    userFilter={userFilter}
                    totalReviews={filteredReviews.length}
                    averages={averages}
                />
                <ExportTable reviews={filteredReviews} />
            </main>
            <footer className="text-center text-xs text-gray-400 pt-4 border-t border-gray-200">
                <p>&copy; {new Date().getFullYear()} PharmaFeedback | Laporan Internal</p>
            </footer>
        </div>
    );
}
