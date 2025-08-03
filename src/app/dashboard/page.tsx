
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
  const name = searchParams.get('name') || "Pengguna";

  return (
    <div className="grid grid-cols-1 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Beri Ulasan untuk Unit {unit}</CardTitle>
          <CardDescription>
             Ulasan Anda akan dicatat atas nama <strong>{name}</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
