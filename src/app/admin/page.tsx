
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
import { Hospital } from "lucide-react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { validateUser } from "@/lib/actions";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = await validateUser(email, password);
      
      if (user && user.role === 'Admin') {
        const queryParams = user.unit ? `?unit=${encodeURIComponent(user.unit)}` : '';
        router.push(`/admin/dashboard${queryParams}`);
      } else {
        throw new Error("Invalid credentials or not an admin.");
      }
    } catch (error) {
       toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Email atau kata sandi salah, atau Anda bukan Admin.",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Link href="/" aria-label="Beranda">
                <Hospital className="h-12 w-12 text-primary" />
              </Link>
            </div>
            <CardTitle className="text-2xl">Portal Admin</CardTitle>
            <CardDescription>
              Masuk untuk mengakses dasbor analitik dan mengelola sistem.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
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
    </div>
  );
}
