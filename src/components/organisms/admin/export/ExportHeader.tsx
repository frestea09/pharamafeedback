
"use client";

import { Hospital, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

export function ExportHeader() {
    return (
        <header className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <Hospital className="h-10 w-10 text-primary" />
                <div>
                    <h1 className="text-2xl font-bold">Laporan Ulasan LayananReview RSUD</h1>
                    <p className="text-gray-500">Dicetak pada: {format(new Date(), 'd MMMM yyyy, HH:mm', { locale: id })}</p>
                </div>
            </div>
            <div className="no-print">
                <Button onClick={() => window.print()}><Printer className="mr-2" />Cetak Laporan</Button>
            </div>
        </header>
    );
}
