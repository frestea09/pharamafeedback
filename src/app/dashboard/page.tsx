
"use client";

import ReviewForm from "@/components/organisms/dashboard/ReviewForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit') || "Layanan";
  const name = searchParams.get('name');

  return (
    <div className="grid grid-cols-1 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Beri Ulasan untuk Unit {unit}</CardTitle>
          <CardDescription>
            Silakan berikan umpan balik Anda untuk membantu kami meningkatkan layanan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
