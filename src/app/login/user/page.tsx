
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

export default function UserLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { getUserByEmail } = useUserStore();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = getUserByEmail(email);

      if (user && user.password === password) { 
        const unit = user.unit || "Layanan";
        const name = user.name;
        router.push(`/dashboard?unit=${encodeURIComponent(unit)}&name=${encodeURIComponent(name)}`);
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Email atau kata sandi salah.",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleLogin}>
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Link href="/" aria-label="Beranda">
                  <TestTube className="h-12 w-12 text-primary" />
                </Link>
              </div>
              <CardTitle className="text-2xl">Login Pengguna</CardTitle>
              <CardDescription>
                Masuk untuk memberikan ulasan baru atau melihat riwayat ulasan yang pernah Anda kirimkan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Pengguna</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="pengguna@example.com"
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
                 Bukan pengguna individu?{" "}
                <Link
                    href="/admin"
                    className="font-medium text-primary hover:underline"
                >
                    Login sebagai Admin
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>

       <div className="w-full max-w-2xl mt-8">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Panduan untuk Pengguna</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p>Selamat datang! Akun Pengguna memungkinkan Anda untuk memberikan umpan balik yang berharga dan melacak semua ulasan yang pernah Anda berikan.</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Akun Pribadi:</strong> Akun Anda dibuat oleh seorang Admin. Silakan hubungi admin jika Anda belum memiliki akun.</li>
                <li><strong>Beri Ulasan:</strong> Setelah login, Anda akan diarahkan ke dasbor utama di mana Anda dapat langsung mengisi formulir ulasan untuk berbagai unit layanan.</li>
                <li><strong>Riwayat Ulasan:</strong> Gunakan menu navigasi untuk mengakses halaman "Riwayat Ulasan" dan melihat semua umpan balik yang telah Anda kirimkan.</li>
                <li><strong>Pentingnya Ulasan Anda:</strong> Setiap ulasan yang Anda berikan membantu kami mengidentifikasi area yang perlu ditingkatkan, mulai dari kecepatan layanan hingga ketersediaan produk.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
