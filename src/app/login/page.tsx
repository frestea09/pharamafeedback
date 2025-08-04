
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
import { serviceUnits } from "@/lib/constants";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("pegawai123");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      let unit = "";
      const lowerCaseEmail = email.toLowerCase();
      
      // Example: pegawai.farmasi@sim.rs -> farmasi
      if (lowerCaseEmail.startsWith("pegawai.")) {
          const unitIdentifier = lowerCaseEmail.split('@')[0].split('.')[1];
          // Find the full unit name from the identifier
          const matchedUnit = serviceUnits.find(u => 
            u.toLowerCase().replace(/[^a-z0-9]/g, '').includes(unitIdentifier)
          );
          if (matchedUnit) {
            unit = matchedUnit;
          }
      }

      if (password === "pegawai123" && unit) {
        const name = "Pasien Anonim";
        router.push(`/dashboard?unit=${encodeURIComponent(unit)}&name=${encodeURIComponent(name)}`);
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Kredensial salah atau format email tidak sesuai (cth: pegawai.farmasi@sim.rs).",
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
              <CardTitle className="text-2xl">Login Pegawai (Mode Kios)</CardTitle>
              <CardDescription>
                 Halaman ini khusus untuk pegawai. Masuk untuk memulai sesi ulasan anonim bagi pasien di unit Anda.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Pegawai</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cth: pegawai.farmasi@sim.rs"
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
                Masuk & Mulai Sesi
              </Button>
              <p className="text-sm text-muted-foreground">
                atau login sebagai{" "}
                <Link
                  href="/login/user"
                  className="font-medium text-primary hover:underline"
                >
                  Pengguna Individu
                </Link>
              </p>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
