import ReviewForm from "@/components/organisms/dashboard/ReviewForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Bagikan Pengalaman Anda</CardTitle>
          <CardDescription>
            Umpan balik Anda yang terperinci membantu kami meningkatkan layanan farmasi kami. Silakan beri peringkat pada aspek-aspek berikut dari kunjungan terakhir Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
