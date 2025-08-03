
"use client";

import { useState, useMemo, useCallback } from "react";
import { UnitReview } from "@/store/reviewStore";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { getColumns } from "./columns";
import { ReviewDetailDialog } from "@/components/organisms/ReviewDetailDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { DateRange } from "react-day-picker";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { useReviewStore } from "@/store/reviewStore";
import { ReviewFilters } from "@/components/organisms/admin/ReviewFilters";
import type { Table } from "@tanstack/react-table";

export default function AllReviewsPage() {
  const { reviews, deleteReview } = useReviewStore();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [selectedReview, setSelectedReview] = useState<UnitReview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [userFilter, setUserFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState<string | undefined>(unit || undefined);

  const filteredReviews = useMemo(() => {
    return reviews.filter(review => {
      const reviewDate = new Date(review.date);
      const unitMatch = unit ? review.unit === unit : true;
      let dateMatch = true;
      if (date?.from) {
          dateMatch = reviewDate >= startOfDay(date.from);
      }
      if (date?.to) {
          dateMatch = dateMatch && reviewDate <= endOfDay(date.to);
      }
      return unitMatch && dateMatch;
    })
  }, [reviews, unit, date]);
  
  const handleViewDetail = (review: UnitReview) => {
    setSelectedReview(review);
    setIsDetailOpen(true);
  };

  const handleDelete = (review: UnitReview) => {
    setSelectedReview(review);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (selectedReview) {
      deleteReview(selectedReview.id);
      toast({
        title: "Ulasan Dihapus",
        description: `Ulasan dari ${selectedReview.user} telah berhasil dihapus.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedReview(null);
  };

  const handleExport = useCallback(() => {
      const params = new URLSearchParams();
      if (unitFilter && unitFilter !== 'Semua Unit') params.set('unit', unitFilter);
      if (userFilter) params.set('user', userFilter);
      if (date?.from) params.set('from', date.from.toISOString());
      if (date?.to) params.set('to', date.to.toISOString());
      window.open(`/admin/reviews/export?${params.toString()}`, '_blank');
  }, [unitFilter, userFilter, date]);

  const columns = useMemo(() => getColumns(handleViewDetail, handleDelete), []);

  const setTableFilters = (table: Table<UnitReview>) => {
    const userColFilter = table.getColumn("user")?.getFilterValue() as string ?? "";
    const unitColFilter = table.getColumn("unit")?.getFilterValue() as string ?? undefined;
    if (userColFilter !== userFilter) setUserFilter(userColFilter);
    if(unitColFilter !== unitFilter) setUnitFilter(unitColFilter);
  };

  return (
    <div className="container mx-auto py-2">
      <DataTable 
        columns={columns} 
        data={filteredReviews} 
        onFilterChange={setTableFilters}
        filterComponent={<ReviewFilters date={date} setDate={setDate} onExport={handleExport} />}
      />
      <ReviewDetailDialog review={selectedReview} isOpen={isDetailOpen} onOpenChange={setIsDetailOpen} />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus ulasan pengguna
              secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
