"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import { format, startOfDay, endOfDay } from "date-fns";
import { id } from "date-fns/locale";
import { ExportHeader } from "@/components/organisms/admin/export/ExportHeader";
import { ExportSummary } from "@/components/organisms/admin/export/ExportSummary";
import { ExportTable } from "@/components/organisms/admin/export/ExportTable";
import { calculateAverages } from "@/lib/utils";
import { getReviews } from "@/lib/actions";
import { UnitReview } from "@/lib/definitions";
import { Loader2 } from "lucide-react";

export default function ExportPage() {
  const searchParams = useSearchParams();
  const [reviews, setReviews] = useState<UnitReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const unit = searchParams.get("unit") || "Semua Unit";
  const userFilter = searchParams.get("user") || "";
  const dateFrom = searchParams.get("from");
  const dateTo = searchParams.get("to");

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const fetchedReviews = await getReviews({
          unit: unit !== "Semua Unit" ? unit : undefined,
          userName: userFilter || undefined,
          from: dateFrom ? new Date(dateFrom) : undefined,
          to: dateTo ? new Date(dateTo) : undefined,
        });
        setReviews(fetchedReviews);
        setTimeout(() => window.print(), 500);
      } catch (error) {
        console.error("Failed to fetch reviews for export:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [unit, userFilter, dateFrom, dateTo]);

  const averages = calculateAverages(reviews);
  const dateRange =
    dateFrom && dateTo
      ? `${format(new Date(dateFrom), "d MMM yyyy", { locale: id })} - ${format(new Date(dateTo), "d MMM yyyy", { locale: id })}`
      : "Semua Waktu";

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-white p-8 text-black" id="export-content">
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
          totalReviews={reviews.length}
          averages={averages}
        />
        <ExportTable reviews={reviews} />
      </main>
      <footer className="border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} PharmaFeedback | SIMRS</p>
      </footer>
    </div>
  );
}
