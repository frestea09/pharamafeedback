
"use client";

import { useState, useEffect } from "react";
import AnalyticsDashboard from "@/components/organisms/admin/AnalyticsDashboard";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { subDays } from "date-fns";
import { getReviews } from "@/lib/actions";
import { UnitReview } from "@/lib/definitions";
import AdminLayout from "../admin-layout";

function DashboardContent() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');
  const [reviews, setReviews] = useState<UnitReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const fetchedReviews = await getReviews({
          unit: unit || undefined,
          from: date?.from,
          to: date?.to,
        });
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [unit, date]);

  return (
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex items-center justify-end gap-2">
          <Label htmlFor="date-filter" className="text-sm font-medium">Tampilkan Data:</Label>
          <Popover>
              <PopoverTrigger asChild>
              <Button
                  id="date"
                  variant={"outline"}
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
      {isLoading ? (
          <div className="flex justify-center items-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          ) : (
          <AnalyticsDashboard reviews={reviews} />
      )}
      </div>
    </AdminLayout>
  )
}


export default function AdminDashboardPage() {
  return <DashboardContent />;
}
