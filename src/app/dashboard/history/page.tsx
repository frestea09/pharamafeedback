
"use client";

import { useContext, useState, useMemo } from "react";
import { ReviewContext, UnitReview } from "@/context/ReviewContext";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { getColumns } from "./columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReviewDetailDialog } from "@/components/organisms/ReviewDetailDialog";
import { useSearchParams } from "next/navigation";

export default function HistoryPage() {
  const { reviews } = useContext(ReviewContext);
  const [selectedReview, setSelectedReview] = useState<UnitReview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "Pengguna";


  const handleViewDetail = (review: UnitReview) => {
    setSelectedReview(review);
    setIsDetailOpen(true);
  };
  
  const columns = useMemo(() => getColumns(handleViewDetail), []);

  const userReviews = reviews
    .filter(review => review.user === name)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <Card>
          <CardHeader>
              <CardTitle>Riwayat Ulasan Anda</CardTitle>
              <CardDescription>Berikut adalah semua umpan balik yang telah Anda berikan.</CardDescription>
          </CardHeader>
          <CardContent>
              <DataTable columns={columns} data={userReviews} />
          </CardContent>
      </Card>
      <ReviewDetailDialog review={selectedReview} isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} />
    </>
  );
}
