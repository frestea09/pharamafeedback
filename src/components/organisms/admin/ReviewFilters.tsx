
"use client";

import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { UnitReview } from "@/store/reviewStore";
import { serviceUnits } from "@/lib/constants";


interface ReviewFiltersProps {
    table: Table<UnitReview>;
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    onExport: () => void;
}

export function ReviewFilters({ table, date, setDate, onExport }: ReviewFiltersProps) {
    const units = ["Semua Unit", ...serviceUnits];
    
    const handleUnitChange = (value: string) => {
        table.getColumn("unit")?.setFilterValue(value === "Semua Unit" ? undefined : value);
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Cari berdasarkan pengguna..."
                    value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("user")?.setFilterValue(event.target.value)}
                    className="max-w-sm h-9"
                />
                <Select
                    value={(table.getColumn("unit")?.getFilterValue() as string) ?? "Semua Unit"}
                    onValueChange={handleUnitChange}
                >
                    <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Filter Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {units.map(unit => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            size="sm"
                            className={cn("w-[260px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                                date.to ? (
                                    <>{format(date.from, "d MMM yyyy", { locale: id })} - {format(date.to, "d MMM yyyy", { locale: id })}</>
                                ) : format(date.from, "d MMM yyyy", { locale: id })
                            ) : <span>Pilih rentang tanggal</span>}
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
