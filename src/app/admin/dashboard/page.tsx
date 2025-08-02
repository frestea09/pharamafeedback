
"use client";

import { useState } from "react";
import AnalyticsDashboard from "@/components/organisms/admin/AnalyticsDashboard";
import { useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { subDays } from "date-fns";


export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  return (
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
      <AnalyticsDashboard unit={unit} period={date} />
    </div>
  );
}
