
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { LogOut, TestTube, ArrowLeft } from "lucide-react";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") || "Layanan";

  return (
    <SidebarProvider>
    <Sidebar collapsible="none">
        <SidebarHeader>
          <div className="flex items-center gap-2">
              <TestTube className="size-8 text-primary" />
              <span className="text-xl font-semibold">PharmaFeedback</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <p className="p-4 text-sm text-muted-foreground">
            Mode Kios Aktif: Minta pasien untuk mengisi formulir di samping. Setelah selesai, klik "Keluar" untuk kembali ke halaman login pegawai.
           </p>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
              <SidebarMenuItem>
                  <SidebarMenuButton href="/login" asChild className="text-base font-medium h-12">
                  <Link href="/login">
                      <LogOut className="size-5" />
                      <span>Keluar & Selesaikan Sesi</span>
                  </Link>
                  </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
    <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
            <Link href="/login" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Kembali ke Login Pegawai
            </Link>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
    </SidebarInset>
    </SidebarProvider>
  );
}
