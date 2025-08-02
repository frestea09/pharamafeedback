
"use client";

import { useState } from "react";
import { users as initialUsers, User } from "@/lib/users";
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
import { UserFormDialog } from "@/components/organisms/admin/UserFormDialog";
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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((user) => user.id !== selectedUser.id));
      toast({
        title: "Pengguna Dihapus",
        description: `Pengguna ${selectedUser.name} telah berhasil dihapus.`,
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = (values: Omit<User, 'id' | 'lastLogin' | 'avatar'>) => {
    if (selectedUser) {
      // Edit
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...selectedUser, ...values } : user
        )
      );
      toast({
        title: "Pengguna Diperbarui",
        description: `Data untuk ${values.name} telah berhasil diperbarui.`,
      });
    } else {
      // Add
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...values,
        lastLogin: new Date().toISOString(),
        avatar: `https://placehold.co/100x100.png?text=${values.name
          .split(" ")
          .map((n) => n[0])
          .join("")}`,
      };
      setUsers([newUser, ...users]);
      toast({
        title: "Pengguna Ditambahkan",
        description: `${values.name} telah berhasil ditambahkan sebagai pengguna baru.`,
      });
    }
    setIsFormOpen(false);
    setSelectedUser(null);
  };

  const columns = getColumns({ onEdit: handleEditUser, onDelete: handleDeleteUser });

  return (
    <div className="container mx-auto py-2">
      <DataTable
        columns={columns}
        data={users}
        filterComponent={<UserFilters />}
      >
        <Button onClick={handleAddUser}>
          <UserPlus className="mr-2 h-4 w-4" />
          Tambah Pengguna
        </Button>
      </DataTable>

      <UserFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        user={selectedUser}
      />

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
