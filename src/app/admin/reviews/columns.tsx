
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UnitReview } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { StarRating } from "@/components/atoms/StarRating"

const getRatingColor = (rating: number) => {
    if (rating < 3) return "destructive";
    if (rating < 4) return "secondary";
    return "default";
};

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
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pengguna
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "date",
    header: "Tanggal",
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
        <div className="flex items-center gap-2">
            <StarRating value={row.original.ratings.serviceQuality} onChange={() => {}} size={16} />
            <span>({row.original.ratings.serviceQuality}/5)</span>
        </div>
     )
  },
  {
    accessorKey: "ratings.staffFriendliness",
    header: "Keramahan",
     cell: ({ row }) => (
         <div className="flex items-center gap-2">
            <StarRating value={row.original.ratings.staffFriendliness} onChange={() => {}} size={16} />
            <span>({row.original.ratings.staffFriendliness}/5)</span>
        </div>
     )
  },
   {
    accessorKey: "comments",
    header: "Komentar",
    cell: ({ row }) => <div className="truncate max-w-xs">{row.getValue("comments")}</div>,
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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(review.id)}
            >
              Salin ID Ulasan
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lihat Detail Ulasan</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">Hapus Ulasan</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
