
"use client";

import { useState } from "react";
import { User } from "@/lib/users";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { getColumns } from "./columns";
import { Input } from "@/components/ui/input";
import type { Table } from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";

function UserFilters({ table }: { table: Table<User> }) {
  return (
    <div className="flex items-center gap-2">
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
            table.getColumn("role")?.setFilterValue(undefined);
          } else {
            table.getColumn("role")?.setFilterValue(value);
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
    </div>
  );
}

export default function AllUsersPage() {
  const { users, deleteUser } = useUser();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');

  const handleEditUser = (user: User) => {
    const queryParams = unit ? `?unit=${unit}` : '';
    router.push(`/admin/users/${user.id}${queryParams}`);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      toast({
        title: "Pengguna Dihapus",
        description: `Pengguna ${selectedUser.name} telah berhasil dihapus.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const columns = getColumns({ onEdit: handleEditUser, onDelete: handleDeleteUser });
  
  const filteredUsers = unit ? users.filter(user => user.unit === unit || user.role !== 'Admin') : users;

  const handleAddUser = () => {
    const queryParams = unit ? `?unit=${unit}` : '';
    router.push(`/admin/users/new${queryParams}`);
  }

  return (
    <div className="container mx-auto py-2">
      <DataTable
        columns={columns}
        data={filteredUsers}
        filterComponent={<UserFilters />}
      >
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Tambah Pengguna
        </Button>
      </DataTable>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Ini akan menghapus pengguna
              secara permanen dari server kami.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
