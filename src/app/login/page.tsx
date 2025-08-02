import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LayananReviewLogo } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
               <Link href="/" aria-label="Beranda">
                  <LayananReviewLogo className="h-12 w-12 text-primary" />
                </Link>
            </div>
            <CardTitle className="text-2xl">Login Pengguna</CardTitle>
            <CardDescription>Masukkan kredensial Anda untuk memberikan umpan balik.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="pengguna@mail.com" defaultValue="pengguna@mail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input id="password" type="password" defaultValue="password123"/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full" asChild>
              <Link href="/dashboard">Masuk</Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Apakah Anda seorang admin?{" "}
              <Link href="/admin" className="font-medium text-primary hover:underline">
                Masuk di sini
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
