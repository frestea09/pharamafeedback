"use client";

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
import { unitReviews } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

const calculateAverageRatings = () => {
  const totals = {
    serviceSpeed: 0,
    serviceQuality: 0,
    serviceCompleteness: 0,
    staffFriendliness: 0,
  };
  const count = unitReviews.length;

  for (const review of unitReviews) {
    totals.serviceSpeed += review.ratings.serviceSpeed;
    totals.serviceQuality += review.ratings.serviceQuality;
    totals.serviceCompleteness += review.ratings.serviceCompleteness;
    totals.staffFriendliness += review.ratings.staffFriendliness;
  }

  return [
    { name: "Kecepatan", average: totals.serviceSpeed / count, fill: "var(--color-speed)" },
    { name: "Kualitas", average: totals.serviceQuality / count, fill: "var(--color-quality)" },
    { name: "Kelengkapan", average: totals.serviceCompleteness / count, fill: "var(--color-completeness)" },
    { name: "Keramahan", average: totals.staffFriendliness / count, fill: "var(--color-friendliness)" },
  ];
};

const getRatingDistribution = (aspect: keyof (typeof unitReviews)[0]['ratings']) => {
    const distribution = [
        { name: '1 Bintang', count: 0 },
        { name: '2 Bintang', count: 0 },
        { name: '3 Bintang', count: 0 },
        { name: '4 Bintang', count: 0 },
        { name: '5 Bintang', count: 0 },
    ];
    unitReviews.forEach(review => {
        const rating = review.ratings[aspect];
        if (rating >= 1 && rating <= 5) {
            distribution[rating-1].count++;
        }
    });
    return distribution;
}

const chartConfig = {
  average: { label: "Peringkat Rata-rata" },
  speed: { label: "Kecepatan", color: "hsl(var(--chart-1))" },
  quality: { label: "Kualitas Pelayanan", color: "hsl(var(--chart-2))" },
  completeness: { label: "Kelengkapan", color: "hsl(var(--chart-3))" },
  friendliness: { label: "Keramahan", color: "hsl(var(--chart-4))" },
};

const COLORS = ["#FF8042", "#FFBB28", "#00C49F", "#0088FE", "#8884d8" ];

export default function AnalyticsDashboard() {
  const averageRatings = calculateAverageRatings();
  const serviceQualityDistribution = getRatingDistribution('serviceQuality');

  const getRatingColor = (rating: number) => {
    if (rating < 3) return "destructive";
    if (rating < 4) return "secondary";
    return "default";
  };
  
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
             <CardDescription>Rincian peringkat bintang untuk kualitas layanan.</CardDescription>
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
                <TableHead>Dikirim</TableHead>
                <TableHead className="text-center">Kecepatan</TableHead>
                <TableHead className="text-center">Kualitas</TableHead>
                <TableHead className="text-center">Lengkap</TableHead>
                <TableHead className="text-center">Keramahan</TableHead>
                <TableHead>Komentar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {unitReviews.slice(0, 5).map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.user}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(review.date), { addSuffix: true, locale: id })}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getRatingColor(review.ratings.serviceSpeed)}>{review.ratings.serviceSpeed}/5</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={getRatingColor(review.ratings.serviceQuality)}>{review.ratings.serviceQuality}/5</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={getRatingColor(review.ratings.serviceCompleteness)}>{review.ratings.serviceCompleteness}/5</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={getRatingColor(review.ratings.staffFriendliness)}>{review.ratings.staffFriendliness}/5</Badge>
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
