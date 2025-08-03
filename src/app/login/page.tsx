
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TestTube } from "lucide-react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("pegawai@pharmafeedback.com");
  const [password, setPassword] = useState("pegawai123");
  const [unit, setUnit] = useState("Farmasi");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // Simplified login logic for staff
      if (password === "pegawai123" && unit) {
        // In a real app, you'd verify staff credentials
        const name = "Budi Santoso"; // Generic patient name for the session
        router.push(`/dashboard?unit=${unit}&name=${name.replace(/ /g, "+")}`);
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Kredensial salah atau unit belum dipilih.",
        });
      }
      setIsLoading(false);
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
              <CardTitle className="text-2xl">Login Pegawai</CardTitle>
              <CardDescription>
                Pilih unit Anda dan masuk untuk memulai sesi ulasan pasien.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="unit">Unit Layanan</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue placeholder="Pilih unit layanan Anda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Farmasi">Farmasi</SelectItem>
                    <SelectItem value="Rawat Jalan">Rawat Jalan</SelectItem>
                    <SelectItem value="Rawat Inap">Rawat Inap</SelectItem>
                    <SelectItem value="Laboratorium">Laboratorium</SelectItem>
                    <SelectItem value="Radiologi">Radiologi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Pegawai</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="pegawai@pharmafeedback.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                 <p className="text-xs text-muted-foreground pt-1">
                  Gunakan: <code>pegawai@pharmafeedback.com</code>
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
                 <p className="text-xs text-muted-foreground pt-1">
                  Kata sandi untuk semua pegawai: <code>pegawai123</code>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading || !unit}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Masuk & Mulai Sesi
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
