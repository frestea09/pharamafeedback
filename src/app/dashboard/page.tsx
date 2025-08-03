
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
          <CardTitle className="text-2xl">Beri Ulasan untuk Unit {unit}</CardTitle>
          <CardDescription>
            Silakan berikan umpan balik Anda untuk membantu kami meningkatkan layanan kami. Ulasan Anda bersifat anonim.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
