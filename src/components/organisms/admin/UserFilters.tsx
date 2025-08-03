
"use client";

import type { Table } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/lib/users";

export function UserFilters({ table }: { table: Table<User> }) {
    const handleRoleChange = (value: string) => {
        table.getColumn("role")?.setFilterValue(value === "all" ? undefined : value);
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                placeholder="Cari berdasarkan email..."
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
                className="max-w-sm"
            />
            <Select
                value={(table.getColumn("role")?.getFilterValue() as string) ?? "all"}
                onValueChange={handleRoleChange}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Peran" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Semua Peran</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
