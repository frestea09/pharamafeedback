
"use client";

import { useContext } from "react";
import { ReviewContext, UnitReview } from "@/context/ReviewContext";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { columns } from "./columns";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Table } from "@tanstack/react-table";

function ReviewFilters({ table }: { table: Table<UnitReview> }) {
  const units = ["Semua Unit", "Farmasi", "Rawat Jalan", "Laboratorium", "Radiologi"];
  
  return (
    <>
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
    </>
  )
}

export default function AllReviewsPage() {
  const { reviews } = useContext(ReviewContext);
  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={reviews}>
         <ReviewFilters />
      </DataTable>
    </div>
  )
}
