
"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { getColumns } from "./columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewDetailDialog } from "@/components/organisms/ReviewDetailDialog";
import { useSearchParams } from "next/navigation";
import { getReviews } from "@/lib/actions";
import { UnitReview } from "@/lib/definitions";
import { Loader2 } from "lucide-react";

export default function HistoryPage() {
  const [reviews, setReviews] = useState<UnitReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<UnitReview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      getReviews({ userId })
        .then(data => setReviews(data))
        .catch(err => console.error("Failed to fetch history:", err))
        .finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }
  }, [userId]);

  const handleViewDetail = (review: UnitReview) => {
    setSelectedReview(review);
    setIsDetailOpen(true);
  };
  
  const columns = useMemo(() => getColumns(handleViewDetail), []);

  return (
    <>
      <Card>
          <CardHeader>
              <CardTitle>Riwayat Ulasan Anda</CardTitle>
              <CardDescription>Berikut adalah semua umpan balik yang telah Anda berikan.</CardDescription>
          </CardHeader>
          <CardContent>
              <DataTable columns={columns} data={reviews} isLoading={isLoading} />
          </CardContent>
      </Card>
      <ReviewDetailDialog review={selectedReview} isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} />
    </>
  );
}
