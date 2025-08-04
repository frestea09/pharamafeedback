
"use client";

import { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, FileText } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import { UnitReview } from "@/lib/definitions";
import { serviceUnits } from "@/lib/constants";
import { Combobox } from "@/components/ui/combobox";


interface ReviewFiltersProps {
    table: Table<UnitReview>;
    date: DateRange | undefined;
    setDate: (date: DateRange | undefined) => void;
    onExport: () => void;
}

export function ReviewFilters({ table, date, setDate, onExport }: ReviewFiltersProps) {
    const units = [{value: "Semua Unit", label: "Semua Unit"}, ...serviceUnits.map(unit => ({value: unit, label: unit}))];
    
    const handleUnitChange = (value: string) => {
        const filterValue = value === "Semua Unit" ? undefined : value;
        table.getColumn("unit")?.setFilterValue(filterValue);
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
            <div className="flex flex-wrap items-center gap-2">
                <Input
                    placeholder="Cari berdasarkan pengguna..."
                    value={(table.getColumn("user.name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("user.name")?.setFilterValue(event.target.value)}
                    className="max-w-sm h-9"
                />
                <div className="w-[200px]">
                     <Combobox
                        options={units}
                        value={(table.getColumn("unit")?.getFilterValue() as string) ?? "Semua Unit"}
                        onChange={handleUnitChange}
                        placeholder="Filter Unit"
                        searchPlaceholder="Cari unit..."
                        emptyPlaceholder="Unit tidak ditemukan."
                    />
                </div>
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
                <FileText className="h-3.5 w-3.5 mr-1" />
                <span>Ekspor</span>
            </Button>
        </div>
    )
}
