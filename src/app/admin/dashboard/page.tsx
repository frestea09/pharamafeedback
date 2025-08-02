
"use client";

import AnalyticsDashboard from "@/components/organisms/admin/AnalyticsDashboard";
import { useSearchParams } from "next/navigation";

export default function AdminDashboardPage() {
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');

  return (
    <div className="space-y-6">
      <AnalyticsDashboard unit={unit} />
    </div>
  );
}
