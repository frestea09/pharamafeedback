
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
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
        toast({
            title: "Profil Diperbarui",
            description: "Informasi profil Anda telah berhasil disimpan.",
        });
        setIsSubmitting(false);
    }, 1000);
  };
  
  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSavingPassword(true);
    setTimeout(() => {
        toast({
            title: "Kata Sandi Diubah",
            description: "Kata sandi Anda telah berhasil diperbarui.",
        });
        setIsSavingPassword(false);
    }, 1000);
  };

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
        <Card>
             <form onSubmit={handleProfileSubmit}>
                <CardHeader>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>Perbarui nama dan alamat email Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" defaultValue="Pengguna 001" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input id="email" type="email" defaultValue="pengguna@mail.com" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Simpan Perubahan
                    </Button>
                </CardFooter>
            </form>
        </Card>
        
        <Card>
            <form onSubmit={handlePasswordSubmit}>
                <CardHeader>
                    <CardTitle>Ubah Kata Sandi</CardTitle>
                    <CardDescription>Masukkan kata sandi lama dan baru Anda untuk memperbarui keamanan akun Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="current-password">Kata Sandi Saat Ini</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">Kata Sandi Baru</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" disabled={isSavingPassword}>
                        {isSavingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Ubah Kata Sandi
                    </Button>
                </CardFooter>
            </form>
        </Card>
    </div>
  );
}
