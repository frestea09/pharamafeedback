
"use client";

import { useContext, useState, useMemo } from "react";
import { ReviewContext, UnitReview } from "@/context/ReviewContext";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { getColumns } from "./columns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";
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

function ReviewFilters({ table }: { table: Table<UnitReview> }) {
  const units = ["Semua Unit", "Farmasi", "Rawat Jalan", "Rawat Inap", "Laboratorium", "Radiologi"];
  
  return (
    <div className="flex items-center gap-2">
       <Input
        placeholder="Cari berdasarkan pengguna..."
        value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("user")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
       <Select
        value={(table.getColumn("unit")?.getFilterValue() as string) ?? "Semua Unit"}
        onValueChange={(value) => {
            if (value === "Semua Unit") {
                table.getColumn("unit")?.setFilterValue(undefined)
            } else {
                table.getColumn("unit")?.setFilterValue(value)
            }
        }}
       >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter Unit" />
        </SelectTrigger>
        <SelectContent>
            {units.map(unit => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default function AllReviewsPage() {
  const { reviews, deleteReview } = useContext(ReviewContext);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');

  const [selectedReview, setSelectedReview] = useState<UnitReview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const filteredReviews = useMemo(() => {
    if (!unit) return reviews;
    return reviews.filter(review => review.unit === unit);
  }, [reviews, unit]);
  
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

  const columns = useMemo(() => getColumns(handleViewDetail, handleDelete), []);

  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={filteredReviews} filterComponent={<ReviewFilters />} />
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
