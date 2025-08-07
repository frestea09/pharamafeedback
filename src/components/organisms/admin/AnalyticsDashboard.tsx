
"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { ThumbsUp, ThumbsDown, HelpCircle, FileX, Star } from "lucide-react";
import { UnitReview } from "@/lib/definitions";
import { calculateAverages } from "@/lib/utils";

const speedMapping: { [key: string]: number } = { slow: 1, medium: 3, fast: 5 };

const chartConfig = {
  average: { label: "Peringkat Rata-rata" },
  speed: { label: "Kecepatan", color: "hsl(var(--chart-1))" },
  quality: { label: "Kualitas Pelayanan", color: "hsl(var(--chart-2))" },
  completeness: { label: "Kelengkapan", color: "hsl(var(--chart-3))" },
  friendliness: { label: "Keramahan", color: "hsl(var(--chart-4))" },
};

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#8884d8" ];

interface AnalyticsDashboardProps {
  reviews: UnitReview[];
}

export default function AnalyticsDashboard({ reviews }: AnalyticsDashboardProps) {

  const averageRatings = useMemo(() => {
    if (!reviews.length) {
      return [
        { name: "Kualitas", average: 0, fill: "var(--color-quality)" },
        { name: "Keramahan", average: 0, fill: "var(--color-friendliness)" },
        { name: "Kecepatan", average: 0, fill: "var(--color-speed)" },
      ];
    }
    
    const averages = calculateAverages(reviews);
    const speedTotal = reviews.reduce((sum, r) => sum + speedMapping[r.serviceSpeed], 0);

    return [
      { name: "Kualitas", average: averages.quality, fill: "var(--color-quality)" },
      { name: "Keramahan", average: averages.friendliness, fill: "var(--color-friendliness)" },
      { name: "Kecepatan", average: speedTotal / reviews.length, fill: "var(--color-speed)" },
    ].sort((a, b) => {
        const order = ["Kualitas", "Keramahan", "Kecepatan"];
        return order.indexOf(a.name) - order.indexOf(b.name);
    });
  }, [reviews]);

  const serviceQualityDistribution = useMemo(() => {
    const distributionMap: { [key: string]: number } = { 'Baik': 0, 'Buruk': 0, '5 Bintang': 0, '4 Bintang': 0, '3 Bintang': 0, '2 Bintang': 0, '1 Bintang': 0 };

    reviews.forEach(review => {
        if (review.serviceQualityNew) {
            if (review.serviceQualityNew === 'positive') distributionMap['Baik']++;
            else distributionMap['Buruk']++;
        } else {
            const rating = review.serviceQuality;
            if (rating >= 1 && rating <= 5) {
                distributionMap[`${rating} Bintang`]++;
            }
        }
    });

    return Object.entries(distributionMap)
        .map(([name, count]) => ({ name, count }))
        .filter(item => item.count > 0);
  }, [reviews]);


  const getRatingColor = (rating: number) => {
    if (rating < 3) return "destructive";
    if (rating < 4) return "secondary";
    return "default";
  };
  
  const getSpeedBadge = (speed: string) => {
    switch (speed) {
      case 'slow':
        return <Badge variant="destructive">Lambat</Badge>;
      case 'medium':
        return <Badge variant="secondary">Sedang</Badge>;
      case 'fast':
        return <Badge variant="default" className="bg-green-500">Cepat</Badge>;
      default:
        return <Badge variant="outline">N/A</Badge>;
    }
  };

   const getCompletenessBadge = (status: string) => {
    switch(status) {
        case 'complete':
            return <Badge className="bg-green-500 gap-1.5"><ThumbsUp className="h-3 w-3" /> Lengkap</Badge>;
        case 'incomplete':
            return <Badge variant="destructive" className="gap-1.5"><ThumbsDown className="h-3 w-3" /> Tdk Lkp</Badge>;
        default:
            return <Badge variant="secondary" className="gap-1.5"><HelpCircle className="h-3 w-3" /> Tdk Tahu</Badge>;
    }
  };

  const NewRatingBadge = ({ value }: { value: string | null | undefined }) => {
    if (value === 'positive') return <Badge className="bg-green-500 gap-1.5"><ThumbsUp className="h-3 w-3" /> Baik</Badge>
    if (value === 'negative') return <Badge variant="destructive" className="gap-1.5"><ThumbsDown className="h-3 w-3" /> Buruk</Badge>
    return null;
}

  if (reviews.length === 0) {
    return (
        <Card className="col-span-full flex flex-col items-center justify-center h-96">
            <CardHeader className="text-center">
                <FileX className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle className="mt-4">Tidak Ada Data</CardTitle>
                <CardDescription>
                    Tidak ada ulasan yang ditemukan untuk rentang tanggal atau unit yang dipilih.
                </CardDescription>
            </CardHeader>
        </Card>
    )
  }
  
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {averageRatings.map((item) => (
            <Card key={item.name}>
                <CardHeader>
                    <CardDescription>{item.name}</CardDescription>
                    <CardTitle className="text-4xl font-bold flex items-baseline gap-2">
                        {item.average.toFixed(1)}
                        <span className="text-lg font-normal text-muted-foreground">/ 5</span>
                    </CardTitle>
                </CardHeader>
            </Card>
        ))}
      </div>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tinjauan Peringkat Rata-rata</CardTitle>
            <CardDescription>Skor rata-rata untuk setiap kategori di semua ulasan.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={averageRatings} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" dataKey="average" domain={[0, 5]} hide />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={80} />
                <CartesianGrid horizontal={false} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Bar dataKey="average" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Kualitas Layanan</CardTitle>
             <CardDescription>Rincian peringkat untuk kualitas layanan.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie data={serviceQualityDistribution} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                       {serviceQualityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ulasan Terbaru</CardTitle>
          <CardDescription>Daftar umpan balik terbaru yang dikirimkan oleh pengguna.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pengguna</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Dikirim</TableHead>
                <TableHead className="text-center">Kualitas</TableHead>
                <TableHead className="text-center">Keramahan</TableHead>
                <TableHead className="text-center">Kecepatan</TableHead>
                <TableHead className="text-center">Kelengkapan</TableHead>
                <TableHead>Komentar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.slice(0, 5).map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.user.name}</TableCell>
                  <TableCell>{review.unit}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(review.date), { addSuffix: true, locale: id })}</TableCell>
                  <TableCell className="text-center">
                     {review.serviceQualityNew ? <NewRatingBadge value={review.serviceQualityNew} /> : <Badge variant={getRatingColor(review.serviceQuality)}>{review.serviceQuality}/5</Badge>}
                  </TableCell>
                  <TableCell className="text-center">
                    {review.staffFriendlinessNew ? <NewRatingBadge value={review.staffFriendlinessNew} /> : <Badge variant={getRatingColor(review.staffFriendliness)}>{review.staffFriendliness}/5</Badge>}
                  </TableCell>
                  <TableCell className="text-center">
                    {getSpeedBadge(review.serviceSpeed)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getCompletenessBadge(review.rawCompleteness)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">{review.comments}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
