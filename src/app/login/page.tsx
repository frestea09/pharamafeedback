
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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("penggunafarmasi@mail.com");
  const [password, setPassword] = useState("password123");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple simulation logic based on email
    setTimeout(() => {
      if (password === "password123") {
        const lowerCaseEmail = email.toLowerCase();
        if (lowerCaseEmail.includes("farmasi")) {
          router.push("/dashboard?unit=Farmasi&name=Pengguna+Farmasi");
        } else if (lowerCaseEmail.includes("rawatjalan")) {
          router.push("/dashboard?unit=Rawat+Jalan&name=Pengguna+Rawat+Jalan");
        } else if (lowerCaseEmail.includes("rawatinap")) {
          router.push("/dashboard?unit=Rawat+Inap&name=Pengguna+Rawat+Inap");
        } else {
           toast({
            variant: "destructive",
            title: "Login Gagal",
            description: "Email tidak dikenali. Gunakan email yang mengandung 'farmasi', 'rawatjalan', atau 'rawatinap'.",
          });
          setIsLoading(false);
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Kata sandi salah.",
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
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
                Masukkan email dan kata sandi Anda untuk memberi ulasan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="pengguna@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                 <p className="text-xs text-muted-foreground">
                  Coba: <code>penggunafarmasi@mail.com</code>, <code>penggunarawatjalan@mail.com</code>, atau <code>penggunarawatinap@mail.com</code>
                </p>
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
                 <p className="text-xs text-muted-foreground">
                  Kata sandi: <code>password123</code>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Masuk
              </Button>
              <p className="text-sm text-muted-foreground">
                Apakah Anda seorang admin?{" "}
                <Link
                  href="/admin"
                  className="font-medium text-primary hover:underline"
                >
                  Masuk di sini
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
