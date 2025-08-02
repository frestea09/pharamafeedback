import ReviewForm from "@/components/dashboard/ReviewForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Share Your Experience</CardTitle>
          <CardDescription>
            Your detailed feedback helps us improve our pharmacy services. Please rate the following aspects of your recent visit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReviewForm />
        </CardContent>
      </Card>
    </div>
  );
}
