import AnalyticsDashboard from "@/components/organisms/admin/AnalyticsDashboard";
import { AdminGuidance } from "@/components/organisms/admin/AdminGuidance";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <AdminGuidance />
      <AnalyticsDashboard />
    </div>
  );
}
