"use client";

import { useEffect, useState } from "react";
import { getAdminGuidance } from "@/lib/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lightbulb, CheckCircle } from "lucide-react";

interface AdminGuidanceData {
    summary: string;
    recommendations: string[];
}

export function AdminGuidance() {
  const [guidance, setGuidance] = useState<AdminGuidanceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminGuidance()
      .then((data) => {
        if(data) setGuidance(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Card className="bg-accent/20 border-accent/30">
        <CardHeader>
            <div className="flex items-start gap-4">
                 <Lightbulb className="h-8 w-8 text-accent mt-1" />
                 <div>
                    <CardTitle>Panduan Admin Berbasis AI</CardTitle>
                    <CardDescription>Ringkasan dan rekomendasi otomatis berdasarkan ulasan pengguna terkini.</CardDescription>
                 </div>
            </div>
        </CardHeader>
        <CardContent>
            {loading ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Menganalisis ulasan dan menghasilkan panduan...</span>
                </div>
            ) : guidance ? (
                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">Ringkasan Umpan Balik</h4>
                        <p className="text-sm text-foreground/80">{guidance.summary}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Rekomendasi Tindakan</h4>
                        <ul className="space-y-2">
                           {guidance.recommendations.map((rec, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-sm text-foreground/80">{rec}</span>
                                </li>
                           ))}
                        </ul>
                    </div>
                </div>
            ) : (
                 <p className="text-sm text-muted-foreground">Gagal memuat panduan admin.</p>
            )}
        </CardContent>
    </Card>
  );
}
