
"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { useSearchParams } from "next/navigation";
import { User } from "@/lib/users";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";


const profileSchema = z.object({
  name: z.string().min(2, "Nama harus memiliki setidaknya 2 karakter."),
  email: z.string().email("Format email tidak valid."),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Kata sandi saat ini wajib diisi."),
  newPassword: z.string().min(6, "Kata sandi baru harus memiliki setidaknya 6 karakter."),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Kata sandi baru dan konfirmasi tidak cocok.",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { getUserByEmail, updateUser } = useUserStore();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: "", email: "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  useEffect(() => {
    const userName = searchParams.get('name');
    if (userName) {
      const userEmail = `${userName.toLowerCase().replace(" ", ".")}@example.com`;
      const user = getUserByEmail(userEmail);
      if (user) {
        setCurrentUser(user);
        profileForm.reset({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [searchParams, getUserByEmail, profileForm]);

  const handleProfileSubmit = (values: ProfileFormValues) => {
    if (!currentUser) return;
    
    updateUser({ ...currentUser, ...values });
    toast({
      title: "Profil Diperbarui",
      description: "Informasi profil Anda telah berhasil disimpan.",
    });
  };
  
  const handlePasswordSubmit = (values: PasswordFormValues) => {
    if (!currentUser) return;

    if (values.currentPassword !== currentUser.password) {
      passwordForm.setError("currentPassword", { message: "Kata sandi saat ini yang Anda masukkan salah." });
      return;
    }
    
    updateUser({ ...currentUser, password: values.newPassword });
    toast({
      title: "Kata Sandi Diubah",
      description: "Kata sandi Anda telah berhasil diperbarui.",
    });
    passwordForm.reset();
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      <Card>
        <Form {...profileForm}>
          <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
            <CardHeader>
              <CardTitle>Informasi Pribadi</CardTitle>
              <CardDescription>Perbarui nama dan alamat email Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Email</FormLabel>
                    <FormControl><Input type="email" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                {profileForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan Perubahan
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card>
        <Form {...passwordForm}>
          <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}>
            <CardHeader>
              <CardTitle>Ubah Kata Sandi</CardTitle>
              <CardDescription>Masukkan kata sandi lama dan baru Anda untuk memperbarui keamanan akun Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata Sandi Saat Ini</FormLabel>
                    <FormControl><Input type="password" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kata Sandi Baru</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Konfirmasi Kata Sandi Baru</FormLabel>
                      <FormControl><Input type="password" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button type="submit" disabled={passwordForm.formState.isSubmitting}>
                {passwordForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Ubah Kata Sandi
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
