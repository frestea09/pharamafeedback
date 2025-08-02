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
import { pharmacyReviews } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const calculateAverageRatings = () => {
  const totals = {
    waitTime: 0,
    serviceQuality: 0,
    medicationAvailability: 0,
    staffFriendliness: 0,
  };
  const count = pharmacyReviews.length;

  for (const review of pharmacyReviews) {
    totals.waitTime += review.ratings.waitTime;
    totals.serviceQuality += review.ratings.serviceQuality;
    totals.medicationAvailability += review.ratings.medicationAvailability;
    totals.staffFriendliness += review.ratings.staffFriendliness;
  }

  return [
    { name: "Wait Time", average: totals.waitTime / count, fill: "var(--color-waitTime)" },
    { name: "Service", average: totals.serviceQuality / count, fill: "var(--color-service)" },
    { name: "Availability", average: totals.medicationAvailability / count, fill: "var(--color-availability)" },
    { name: "Friendliness", average: totals.staffFriendliness / count, fill: "var(--color-friendliness)" },
  ];
};

const getRatingDistribution = (aspect: keyof (typeof pharmacyReviews)[0]['ratings']) => {
    const distribution = [
        { name: '1 Star', count: 0 },
        { name: '2 Stars', count: 0 },
        { name: '3 Stars', count: 0 },
        { name: '4 Stars', count: 0 },
        { name: '5 Stars', count: 0 },
    ];
    pharmacyReviews.forEach(review => {
        const rating = review.ratings[aspect];
        if (rating >= 1 && rating <= 5) {
            distribution[rating-1].count++;
        }
    });
    return distribution;
}

const chartConfig = {
  average: { label: "Average Rating" },
  waitTime: { label: "Wait Time", color: "hsl(var(--chart-1))" },
  service: { label: "Service Quality", color: "hsl(var(--chart-2))" },
  availability: { label: "Availability", color: "hsl(var(--chart-3))" },
  friendliness: { label: "Friendliness", color: "hsl(var(--chart-4))" },
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
            <CardTitle>Average Ratings Overview</CardTitle>
            <CardDescription>Average score for each category across all reviews.</CardDescription>
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
            <CardTitle>Service Quality Distribution</CardTitle>
             <CardDescription>Breakdown of star ratings for service quality.</CardDescription>
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
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>A list of the latest feedback submitted by patients.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-center">Wait</TableHead>
                <TableHead className="text-center">Service</TableHead>
                <TableHead className="text-center">Stock</TableHead>
                <TableHead className="text-center">Staff</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pharmacyReviews.slice(0, 5).map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.patient}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDistanceToNow(new Date(review.date), { addSuffix: true })}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getRatingColor(review.ratings.waitTime)}>{review.ratings.waitTime}/5</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={getRatingColor(review.ratings.serviceQuality)}>{review.ratings.serviceQuality}/5</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                     <Badge variant={getRatingColor(review.ratings.medicationAvailability)}>{review.ratings.medicationAvailability}/5</Badge>
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
