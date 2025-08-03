
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ExportSummaryProps {
    unit: string;
    dateRange: string;
    userFilter: string;
    totalReviews: number;
    averages: { quality: number; friendliness: number; };
}

export function ExportSummary({ unit, dateRange, userFilter, totalReviews, averages }: ExportSummaryProps) {
    const summaryItems = [
        { label: "Unit Layanan:", value: unit },
        { label: "Periode Laporan:", value: dateRange },
        { label: "Filter Pengguna:", value: userFilter || 'Tidak ada' },
        { label: "Total Ulasan:", value: `${totalReviews} ulasan` },
        { label: "Rata-rata Kualitas:", value: `${averages.quality.toFixed(1)} / 5.0` },
        { label: "Rata-rata Keramahan:", value: `${averages.friendliness.toFixed(1)} / 5.0` },
    ];

    return (
        <Card className="mb-8 border-gray-300 shadow-none">
            <CardHeader>
                <CardTitle>Ringkasan Laporan</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
                {summaryItems.map(item => (
                    <div key={item.label}>
                        <p className="font-semibold">{item.label}</p>
                        <p>{item.value}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
