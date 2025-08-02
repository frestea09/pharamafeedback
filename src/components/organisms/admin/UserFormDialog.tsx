"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { type User } from "@/lib/users";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface UserFormDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (values: Omit<User, 'id' | 'lastLogin' | 'avatar'>) => void;
  user: User | null;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  role: z.enum(["Admin", "User"]),
  unit: z.enum(["Farmasi", "Rawat Jalan", "Rawat Inap", "Laboratorium", "Radiologi", "none"]).optional(),
});

type UserFormValues = z.infer<typeof formSchema>;

export function UserFormDialog({ isOpen, onOpenChange, onSubmit, user }: UserFormDialogProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "User",
      unit: "none",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
          role: user.role,
          unit: user.unit || "none",
        });
      } else {
        form.reset({
          name: "",
          email: "",
          role: "User",
          unit: "none",
        });
      }
    }
  }, [user, form, isOpen]);

  const isEditing = !!user;

  const handleFormSubmit = (values: UserFormValues) => {
    const dataToSubmit: Omit<User, 'id' | 'lastLogin' | 'avatar'> = {
      name: values.name,
      email: values.email,
      role: values.role,
      unit: values.role === 'Admin' && values.unit && values.unit !== 'none' ? values.unit : undefined,
    };
    onSubmit(dataToSubmit);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Ubah Pengguna" : "Tambah Pengguna Baru"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? `Ubah detail untuk ${user?.name}.`
              : "Isi formulir di bawah ini untuk menambahkan pengguna baru."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="cth. Budi Santoso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="cth. budi@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peran</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih peran pengguna" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch('role') === 'Admin' && (
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit (Khusus Admin)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "none"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih unit (opsional untuk admin umum)" />
                        </Trigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="none">Admin Umum (Semua Unit)</SelectItem>
                        <SelectItem value="Farmasi">Farmasi</SelectItem>
                        <SelectItem value="Rawat Jalan">Rawat Jalan</SelectItem>
                        <SelectItem value="Rawat Inap">Rawat Inap</SelectItem>
                        <SelectItem value="Laboratorium">Laboratorium</SelectItem>
                        <SelectItem value="Radiologi">Radiologi</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Simpan Perubahan" : "Tambah Pengguna"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}