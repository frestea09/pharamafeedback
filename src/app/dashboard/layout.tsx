
"use client";

import Link from "next/link";
import { TestTube } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-col min-h-screen">
       <header className="flex h-20 items-center justify-center border-b bg-card px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
              <TestTube className="size-8 text-primary" />
              <span className="text-2xl font-semibold">PharmaFeedback</span>
          </div>
        </header>
        <main className="flex-1 bg-background/50">
            <div className="container mx-auto max-w-4xl py-8 md:py-12">
                {children}
            </div>
        </main>
    </div>
  );
}
