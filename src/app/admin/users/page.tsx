
import { users, User } from "@/lib/users"
import { DataTable } from "@/components/organisms/admin/DataTable"
import { columns } from "./columns"
import { Input } from "@/components/ui/input"
import type { Table } from "@tanstack/react-table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


function UserFilters({ table }: { table: Table<User> }) {
  return (
    <>
       <Input
        placeholder="Cari berdasarkan email..."
        value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("email")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <Select
        value={(table.getColumn("role")?.getFilterValue() as string) ?? "all"}
        onValueChange={(value) => {
          if (value === "all") {
            table.getColumn("role")?.setFilterValue(undefined)
          } else {
            table.getColumn("role")?.setFilterValue(value)
          }
        }}
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
    </>
  );
}


export default function AllUsersPage() {
  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={users}>
          <UserFilters />
      </DataTable>
    </div>
  )
}
