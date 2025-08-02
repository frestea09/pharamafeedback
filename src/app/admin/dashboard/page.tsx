
"use client";

import { useState } from "react";
import AnalyticsDashboard from "@/components/organisms/admin/AnalyticsDashboard";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type Period = "today" | "yesterday" | "week" | "month" | "last_month" | "year" | "last_year" | "all";

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');
  const [period, setPeriod] = useState<Period>("all");

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-end gap-2">
          <Label htmlFor="period-filter" className="text-sm font-medium">Tampilkan Data:</Label>
          <Select value={period} onValueChange={(value) => setPeriod(value as Period)}>
            <SelectTrigger id="period-filter" className="w-[180px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hari Ini</SelectItem>
              <SelectItem value="yesterday">Kemarin</SelectItem>
              <SelectItem value="week">7 Hari Terakhir</SelectItem>
              <SelectItem value="month">30 Hari Terakhir</SelectItem>
              <SelectItem value="last_month">Bulan Kemarin</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
              <SelectItem value="last_year">Tahun Kemarin</SelectItem>
              <SelectItem value="all">Semua Waktu</SelectItem>
            </SelectContent>
          </Select>
       </div>
      <AnalyticsDashboard unit={unit} period={period} />
    </div>
  );
}
