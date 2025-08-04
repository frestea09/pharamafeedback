
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
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
import { subDays } from "date-fns";
import { ReviewFilters } from "@/components/organisms/admin/ReviewFilters";
import type { Table } from "@tanstack/react-table";
import { getReviews, deleteReview as deleteReviewAction } from "@/lib/actions";
import { UnitReview } from "@/lib/definitions";
import AdminLayout from "../admin-layout";

export default function AllReviewsPage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const adminUnit = searchParams.get('unit');

  const [reviews, setReviews] = useState<UnitReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [selectedReview, setSelectedReview] = useState<UnitReview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [userFilter, setUserFilter] = useState('');
  const [unitFilter, setUnitFilter] = useState<string | undefined>(adminUnit || undefined);

  const fetchReviews = useCallback(async () => {
    setIsLoading(true);
    try {
        const finalUnitFilter = adminUnit || (unitFilter && unitFilter !== 'Semua Unit' ? unitFilter : undefined);
        const fetchedReviews = await getReviews({
            unit: finalUnitFilter,
            userName: userFilter || undefined,
            from: date?.from,
            to: date?.to,
        });
        setReviews(fetchedReviews);
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Gagal memuat ulasan",
            description: "Terjadi kesalahan saat mengambil data ulasan.",
        });
        console.error(error);
    } finally {
        setIsLoading(false);
    }
  }, [adminUnit, unitFilter, userFilter, date, toast]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);
  
  const handleViewDetail = (review: UnitReview) => {
    setSelectedReview(review);
    setIsDetailOpen(true);
  };

  const handleDelete = (review: UnitReview) => {
    setSelectedReview(review);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (selectedReview) {
      try {
        await deleteReviewAction(selectedReview.id);
        toast({
          title: "Ulasan Dihapus",
          description: `Ulasan dari ${selectedReview.user.name} telah berhasil dihapus.`,
        });
        fetchReviews(); // Re-fetch reviews to update the list
      } catch (error) {
         toast({
          variant: "destructive",
          title: "Gagal menghapus ulasan",
          description: "Terjadi kesalahan saat menghapus data.",
        });
      }
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

  const columns = useMemo(() => getColumns(handleViewDetail, handleDelete), [handleViewDetail, handleDelete]);

  const setTableFilters = (table: Table<UnitReview>) => {
    const userColFilter = table.getColumn("user.name")?.getFilterValue() as string ?? "";
    const unitColFilter = table.getColumn("unit")?.getFilterValue() as string ?? undefined;
    
    setUserFilter(userColFilter);
    setUnitFilter(unitColFilter);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto py-2">
        <DataTable 
          columns={columns} 
          data={reviews} 
          isLoading={isLoading}
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
    </AdminLayout>
  )
}
