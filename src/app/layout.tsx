"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// export const metadata: Metadata = {
//   title: "LayananReview RSUD",
//   description: "Aplikasi web untuk mengumpulkan ulasan dan umpan balik layanan RSUD Oto Iskandar Dinata.",
// };

// export const metadata: Metadata = {
//   icons: {
//     icon: "/logo-polos.ico", // or .png, .svg
//   },
// };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <title>RSUD Oto Iskandar Dinata</title>

        <meta
          name="description"
          content="Aplikasi web untuk mengumpulkan ulasan dan umpan balik layanan RSUD Oto Iskandar Dinata."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
