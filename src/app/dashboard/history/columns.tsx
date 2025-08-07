
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { UnitReview } from "@/lib/definitions"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, ThumbsDown, ThumbsUp, HelpCircle, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const getSpeedBadge = (speed: string) => {
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

const getCompletenessBadge = (status: string) => {
    switch(status) {
        case 'complete':
            return <Badge className="bg-green-500 gap-1.5"><ThumbsUp className="h-3 w-3" /> Lengkap</Badge>;
        case 'incomplete':
            return <Badge variant="destructive" className="gap-1.5"><ThumbsDown className="h-3 w-3" /> Tdk Lengkap</Badge>;
        default:
            return <Badge variant="secondary" className="gap-1.5"><HelpCircle className="h-3 w-3" /> Tdk Tahu</Badge>;
    }
};

const NewRatingBadge = ({ value }: { value: string }) => {
    if (value === "positive") {
        return <Badge className="bg-green-500 gap-1.5"><ThumbsUp className="h-3 w-3" /> Baik</Badge>;
    }
    return <Badge variant="destructive" className="gap-1.5"><ThumbsDown className="h-3 w-3" /> Buruk</Badge>;
};


export const getColumns = (
  onViewDetail: (review: UnitReview) => void
): ColumnDef<UnitReview>[] => [
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
    accessorKey: "unit",
    header: "Unit",
  },
  {
    accessorKey: "serviceSpeed",
    header: "Kecepatan",
     cell: ({ row }) => getSpeedBadge(row.original.serviceSpeed),
  },
  {
    accessorKey: "rawCompleteness",
    header: "Kelengkapan",
    cell: ({ row }) => getCompletenessBadge(row.original.rawCompleteness),
  },
  {
    accessorKey: "serviceQuality",
    header: "Kualitas",
     cell: ({ row }) => {
        if (row.original.serviceQualityNew) {
            return <NewRatingBadge value={row.original.serviceQualityNew} />;
        }
        return (
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent" fill="currentColor"/>
                <span className="text-muted-foreground">({row.original.serviceQuality}/5)</span>
            </div>
        )
     }
  },
  {
    accessorKey: "staffFriendliness",
    header: "Keramahan",
     cell: ({ row }) => {
        if (row.original.staffFriendlinessNew) {
            return <NewRatingBadge value={row.original.staffFriendlinessNew} />;
        }
        return (
            <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-accent" fill="currentColor"/>
                <span className="text-muted-foreground">({row.original.staffFriendliness}/5)</span>
            </div>
        )
     }
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
            <DropdownMenuItem onClick={() => onViewDetail(review)}>Lihat Detail</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
