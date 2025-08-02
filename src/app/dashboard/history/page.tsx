
import { unitReviews } from "@/lib/data";
import { DataTable } from "@/components/organisms/admin/DataTable";
import { columns } from "./columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
  // In a real app, you would fetch reviews for the currently logged-in user.
  // For this demo, we'll filter them to show a subset.
  const userReviews = unitReviews.filter(review => review.user.startsWith("Pengguna"));

  return (
    <Card>
        <CardHeader>
            <CardTitle>Riwayat Ulasan Anda</CardTitle>
            <CardDescription>Berikut adalah semua umpan balik yang telah Anda berikan.</CardDescription>
        </CardHeader>
        <CardContent>
            <DataTable columns={columns} data={userReviews} />
        </CardContent>
    </Card>
  );
}
