
"use client";

import { useState, useMemo } from "react";
import { UnitReview } from "@/store/reviewStore";
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
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReviewStore } from "@/store/reviewStore";

function ReviewFilters({ table, date, setDate }: { table: Table<UnitReview>, date: DateRange | undefined, setDate: (date: DateRange | undefined) => void }) {
  const units = ["Semua Unit", "Farmasi", "Rawat Jalan", "Rawat Inap", "Laboratorium", "Radiologi"];
  
  return (
    <div className="flex flex-wrap items-center gap-2">
       <Input
        placeholder="Cari berdasarkan pengguna..."
        value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("user")?.setFilterValue(event.target.value)
        }
        className="max-w-sm h-9"
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
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Filter Unit" />
        </SelectTrigger>
        <SelectContent>
            {units.map(unit => (
                <SelectItem key={unit} value={unit}>{unit}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="sm"
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "d MMM yyyy", { locale: id })} -{" "}
                  {format(date.to, "d MMM yyyy", { locale: id })}
                </>
              ) : (
                format(date.from, "d MMM yyyy", { locale: id })
              )
            ) : (
              <span>Pilih rentang tanggal</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={id}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

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

  const columns = useMemo(() => getColumns(handleViewDetail, handleDelete), []);

  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={filteredReviews} filterComponent={<ReviewFilters date={date} setDate={setDate} />} />
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
