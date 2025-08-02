
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
        value={(table.getColumn("serviceQuality")?.getFilterValue() as string) ?? "all"}
        onValueChange={(value) => {
          if (value === "all") {
            table.getColumn("serviceQuality")?.setFilterValue(undefined)
          } else {
            table.getColumn("serviceQuality")?.setFilterValue(Number(value))
          }
        }}
       >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter Kualitas" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Kualitas</SelectItem>
          <SelectItem value="5">5 Bintang</SelectItem>
          <SelectItem value="4">4 Bintang</SelectItem>
          <SelectItem value="3">3 Bintang</SelectItem>
          <SelectItem value="2">2 Bintang</SelectItem>
          <SelectItem value="1">1 Bintang</SelectItem>
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

    