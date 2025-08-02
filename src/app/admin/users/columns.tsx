
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { User } from "@/lib/users"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
        const user = row.original;
        return (
            <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
            </div>
        )
    }
  },
  {
    accessorKey: "role",
    header: "Peran",
    cell: ({ row }) => {
        const role = row.getValue("role") as string;
        return <Badge variant={role === 'Admin' ? 'default' : 'secondary'}>{role}</Badge>
    }
  },
  {
    accessorKey: "lastLogin",
    header: "Login Terakhir",
    cell: ({ row }) => formatDistanceToNow(new Date(row.getValue("lastLogin")), { addSuffix: true, locale: id }),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Salin ID Pengguna
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ubah Pengguna</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">Hapus Pengguna</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
