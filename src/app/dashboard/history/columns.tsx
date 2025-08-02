
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UnitReview } from "@/context/ReviewContext"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StarRating } from "@/components/atoms/StarRating"

const getSpeedBadge = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow':
        return <Badge variant="destructive">Lambat</Badge>;
      case 'medium':
        return <Badge variant="secondary">Sedang</Badge>;
      case 'fast':
        return <Badge variant="default" className="bg-green-500">Cepat</Badge>;
      default:
        return <Badge variant="outline">N/A</Badge>;
    }
};

export const columns: ColumnDef<UnitReview>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => format(new Date(row.getValue("date")), "d MMMM yyyy", { locale: id }),
  },
  {
    accessorKey: "ratings.serviceSpeed",
    header: "Kecepatan",
     cell: ({ row }) => getSpeedBadge(row.original.ratings.serviceSpeed),
  },
  {
    accessorKey: "ratings.serviceQuality",
    header: "Kualitas",
     cell: ({ row }) => (
        <div className="flex items-center gap-1">
            <StarRating value={row.original.ratings.serviceQuality} onChange={() => {}} size={16} />
            <span className="text-muted-foreground">({row.original.ratings.serviceQuality}/5)</span>
        </div>
     )
  },
  {
    accessorKey: "ratings.staffFriendliness",
    header: "Keramahan",
     cell: ({ row }) => (
         <div className="flex items-center gap-1">
            <StarRating value={row.original.ratings.staffFriendliness} onChange={() => {}} size={16} />
            <span className="text-muted-foreground">({row.original.ratings.staffFriendliness}/5)</span>
        </div>
     )
  },
   {
    accessorKey: "comments",
    header: "Komentar",
    cell: ({ row }) => <div className="truncate max-w-sm">{row.getValue("comments")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const review = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

    