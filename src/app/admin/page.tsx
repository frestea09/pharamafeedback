
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { TestTube } from "lucide-react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/userStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@pharmafeedback.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { getUserByEmail } = useUserStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = getUserByEmail(email);
      
      if (user && user.role === 'Admin' && user.password === password) {
        const queryParams = user.unit ? `?unit=${encodeURIComponent(user.unit)}` : '';
        router.push(`/admin/dashboard${queryParams}`);
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Email atau kata sandi yang Anda masukkan salah.",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Link href="/" aria-label="Beranda">
                <TestTube className="h-12 w-12 text-primary" />
              </Link>
            </div>
            <CardTitle className="text-2xl">Portal Admin</CardTitle>
            <CardDescription>
              Masuk untuk mengakses dasbor analitik, mengelola ulasan, dan mengatur akun pengguna.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Masuk
              </Button>
               <p className="text-sm text-muted-foreground">
                Bukan seorang admin?{" "}
                <Link
                    href="/login/user"
                    className="font-medium text-primary hover:underline"
                >
                    Login sebagai pengguna
                </Link>
                </p>
            </CardFooter>
          </form>
        </Card>
      </div>
      <div className="w-full max-w-2xl mt-8">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Panduan untuk Admin</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p>Selamat datang di Portal Admin. Halaman ini adalah gerbang Anda untuk mengelola seluruh ekosistem PharmaFeedback.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Admin Sistem:</strong> Memiliki akses penuh untuk melihat data dari semua unit dan mengelola semua akun (Admin dan Pengguna). Gunakan akun ini untuk tugas-tugas administratif tingkat tinggi.</li>
                <li><strong>Admin Unit:</strong> Dibatasi untuk melihat analitik dan mengelola pengguna hanya di unit mereka sendiri (misalnya, Farmasi). Ini berguna untuk manajer unit.</li>
                <li><strong>Dasbor Analitik:</strong> Setelah login, Anda akan disambut dengan dasbor yang merangkum semua data umpan balik.</li>
                <li><strong>Kelola Pengguna:</strong> Anda dapat menambah, mengubah, dan menghapus akun Admin dan Pengguna.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
