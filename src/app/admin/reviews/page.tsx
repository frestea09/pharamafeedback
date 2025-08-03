
"use client";

import { useState, useMemo, useCallback } from "react";
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
import { useSearchParams, useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useReviewStore } from "@/store/reviewStore";

function ReviewFilters({ 
  table, 
  date, 
  setDate,
  onExport
}: { 
  table: Table<UnitReview>, 
  date: DateRange | undefined, 
  setDate: (date: DateRange | undefined) => void,
  onExport: () => void 
}) {
  const units = ["Semua Unit", "Farmasi", "Rawat Jalan", "Rawat Inap", "Laboratorium", "Radiologi"];
  
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
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
      <Button variant="outline" size="sm" onClick={onExport}>
        <FileText className="h-3.5 w-3.5" />
        <span>Ekspor</span>
      </Button>
    </div>
  )
}

export default function AllReviewsPage() {
  const { reviews, deleteReview } = useReviewStore();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const unit = searchParams.get('unit');

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [selectedReview, setSelectedReview] = useState<UnitReview | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // State for filter values to be passed to export page
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
    if (userColFilter !== userFilter) {
      setUserFilter(userColFilter);
    }
    if(unitColFilter !== unitFilter) {
      setUnitFilter(unitColFilter)
    }
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
