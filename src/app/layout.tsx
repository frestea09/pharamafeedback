
"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ReviewProvider } from "@/context/ReviewContext";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const metadata: Metadata = {
//   title: "PharmaFeedback",
//   description: "Aplikasi web untuk mengumpulkan ulasan dan umpan balik layanan farmasi.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
       <head>
        <title>PharmaFeedback</title>
        <meta name="description" content="Aplikasi web untuk mengumpulkan ulasan dan umpan balik layanan farmasi." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased", fontSans.variable)}>
        <ReviewProvider>
            {children}
        </ReviewProvider>
        <Toaster />
      </body>
    </html>
  );
}
