
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/UserContext";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { User } from "@/lib/users";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nama harus memiliki setidaknya 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  role: z.enum(["Admin", "User"]),
  unit: z.enum(["Farmasi", "Rawat Jalan", "Rawat Inap", "Laboratorium", "Radiologi", "none"]).optional(),
});

type UserFormValues = z.infer<typeof formSchema>;

export default function UserFormPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { getUserById, addUser, updateUser } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const id = params.id as string;
  const isEditing = id !== 'new';

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
    if (isEditing) {
      const existingUser = getUserById(id);
      if (existingUser) {
        setUser(existingUser);
        form.reset({
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
          unit: existingUser.unit || "none",
        });
      } else {
        toast({
            variant: "destructive",
            title: "Pengguna Tidak Ditemukan",
            description: "Pengguna yang Anda coba edit tidak ada.",
        });
        router.push('/admin/users');
      }
    }
    setIsLoading(false);
  }, [id, isEditing, router, form, toast, getUserById]);


  const onSubmit = (values: UserFormValues) => {
    const unitValue = values.role === 'Admin' && values.unit && values.unit !== 'none' ? values.unit : undefined;
    
    if (isEditing && user) {
        updateUser({
            ...user,
            ...values,
            unit: unitValue
        });
      toast({
        title: "Pengguna Diperbarui",
        description: `Data untuk ${values.name} telah berhasil diperbarui.`,
      });
    } else {
        addUser({
            ...values,
            unit: unitValue,
        });
      toast({
        title: "Pengguna Ditambahkan",
        description: `${values.name} telah berhasil ditambahkan sebagai pengguna baru.`,
      });
    }
    router.push('/admin/users');
  };

  if (isLoading) {
    return (
        <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/users">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Daftar Pengguna
            </Link>
        </Button>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>{isEditing ? "Ubah Pengguna" : "Tambah Pengguna Baru"}</CardTitle>
              <CardDescription>
                {isEditing
                  ? `Ubah detail untuk ${user?.name}.`
                  : "Isi formulir di bawah ini untuk menambahkan pengguna baru."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? "Simpan Perubahan" : "Tambah Pengguna"}
                </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
