
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

export default function ProfilePage() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { getUserByEmail, updateUser } = useUserStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  useEffect(() => {
    const userName = searchParams.get('name') || "";
    const userEmail = `${userName.toLowerCase().replace(" ", ".")}@example.com`
    const user = getUserByEmail(userEmail);
    if (user) {
      setCurrentUser(user);
      setName(user.name);
      setEmail(user.email);
    }
  }, [searchParams, getUserByEmail]);


  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) return;

    setIsSubmitting(true);
    setTimeout(() => {
      updateUser({ ...currentUser, name, email });
      toast({
        title: "Profil Diperbarui",
        description: "Informasi profil Anda telah berhasil disimpan.",
      });
      setIsSubmitting(false);
    }, 1000);
  };
  
  const handlePasswordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentUser) return;

    if (currentPassword !== currentUser.password) {
        toast({
            variant: "destructive",
            title: "Gagal Mengubah Kata Sandi",
            description: "Kata sandi saat ini yang Anda masukkan salah.",
        });
        return;
    }
    
    if (newPassword !== confirmPassword) {
        toast({
            variant: "destructive",
            title: "Gagal Mengubah Kata Sandi",
            description: "Kata sandi baru dan konfirmasi tidak cocok.",
        });
        return;
    }

    setIsSavingPassword(true);
    setTimeout(() => {
        updateUser({ ...currentUser, password: newPassword });
        toast({
            title: "Kata Sandi Diubah",
            description: "Kata sandi Anda telah berhasil diperbarui.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsSavingPassword(false);
    }, 1000);
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
             <form onSubmit={handleProfileSubmit}>
                <CardHeader>
                    <CardTitle>Informasi Pribadi</CardTitle>
                    <CardDescription>Perbarui nama dan alamat email Anda.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Alamat Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required/>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">Kata Sandi Baru</Label>
                            <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Konfirmasi Kata Sandi Baru</Label>
                            <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
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
