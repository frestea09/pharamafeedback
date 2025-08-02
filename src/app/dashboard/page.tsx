
"use client";

import ReviewForm from "@/components/organisms/dashboard/ReviewForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit') || "Layanan";

  return (
    <div className="grid grid-cols-1">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Bagikan Pengalaman Anda di Unit {unit}</CardTitle>
          <CardDescription>
            Umpan balik Anda yang terperinci membantu kami meningkatkan unit layanan kami. Silakan beri peringkat pada aspek-aspek berikut dari kunjungan terakhir Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
