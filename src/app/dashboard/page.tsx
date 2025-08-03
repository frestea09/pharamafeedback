
"use client";

import ReviewForm from "@/components/organisms/dashboard/ReviewForm";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit') || "Layanan";

  return (
    <div className="grid grid-cols-1 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Beri Ulasan untuk Unit {unit}</CardTitle>
          <CardDescription>
            Silakan berikan umpan balik Anda untuk membantu kami meningkatkan layanan kami. Ulasan Anda bersifat anonim.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
      
      <div className="flex flex-col items-center gap-4">
        <Separator />
        <p className="text-sm text-muted-foreground">Setelah selesai mengisi, pegawai dapat keluar dari sesi ini.</p>
         <Button variant="outline" asChild>
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            Keluar & Selesaikan Sesi
          </Link>
        </Button>
      </div>
    </div>
  );
}
