
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

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@pharmafeedback.com");
  const [password, setPassword] = useState("admin123");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (password === "admin123") {
         const lowerCaseEmail = email.toLowerCase();
         if (lowerCaseEmail.includes("admin.farmasi")) {
            router.push("/admin/dashboard?unit=Farmasi");
         } else if (lowerCaseEmail.includes("admin.rawatjalan")) {
            router.push("/admin/dashboard?unit=Rawat+Jalan");
         } else if (lowerCaseEmail === "admin@pharmafeedback.com") {
            router.push("/admin/dashboard");
         } else {
            toast({
              variant: "destructive",
              title: "Login Gagal",
              description: "Email atau kata sandi yang Anda masukkan salah.",
            });
         }
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
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Link href="/" aria-label="Beranda">
                <TestTube className="h-12 w-12 text-primary" />
              </Link>
            </div>
            <CardTitle className="text-2xl">Login Admin</CardTitle>
            <CardDescription>
              Masukkan kredensial Anda untuk mengakses dasbor admin.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@pharmafeedback.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                 <div className="text-xs text-muted-foreground space-y-1 pt-2">
                  <p><strong>Admin Sistem (Semua Unit):</strong><br/><code>admin@pharmafeedback.com</code></p>
                  <p className="mt-2"><strong>Contoh Admin per Unit:</strong></p>
                  <ul className="list-disc pl-5">
                    <li><code>admin.farmasi@pharmafeedback.com</code></li>
                    <li><code>admin.rawatjalan@pharmafeedback.com</code></li>
                  </ul>
                </div>
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
                 <p className="text-xs text-muted-foreground pt-1">
                  Kata sandi untuk semua akun admin adalah: <strong>admin123</strong>
                </p>
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
                    href="/login"
                    className="font-medium text-primary hover:underline"
                >
                    Login sebagai pengguna
                </Link>
                </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
