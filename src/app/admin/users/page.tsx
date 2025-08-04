
"use client";

import { useState, useEffect, useCallback } from "react";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { getColumns } from "./columns";
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
import { UserFilters } from "@/components/organisms/admin/UserFilters";
import { getUsers, deleteUser as deleteUserAction } from "@/lib/actions";
import { User } from "@prisma/client";

export default function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await getUsers({ unit: unit || undefined });
      setUsers(fetchedUsers);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal memuat pengguna",
      });
    } finally {
      setIsLoading(false);
    }
  }, [unit, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEditUser = (user: User) => {
    const queryParams = unit ? `?unit=${unit}` : '';
    router.push(`/admin/users/${user.id}${queryParams}`);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUserAction(selectedUser.id);
        toast({
          title: "Pengguna Dihapus",
          description: `Pengguna ${selectedUser.name} telah berhasil dihapus.`,
        });
        fetchUsers(); // Refresh
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Gagal menghapus pengguna",
        });
      }
    }
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const columns = getColumns({ onEdit: handleEditUser, onDelete: handleDeleteUser });

  const handleAddUser = () => {
    const queryParams = unit ? `?unit=${unit}` : '';
    router.push(`/admin/users/new${queryParams}`);
  }

  return (
    <div className="container mx-auto py-2">
      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
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
