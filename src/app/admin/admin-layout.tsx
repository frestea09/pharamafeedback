

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
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, MessageSquare, LogOut, FileText, UserPlus, TestTube, HelpCircle } from "lucide-react";
import { adminMenuItems } from "@/lib/constants";

const getPageTitle = (pathname: string, unit: string | null): string => {
    const baseTitles: { [key: string]: string } = {
        "/admin/dashboard": "Dasbor Admin",
        "/admin/reviews": "Semua Ulasan",
        "/admin/users": "Kelola Pengguna",
        "/admin/faq": "Bantuan & Panduan"
    };

    if (pathname.startsWith('/admin/users/')) {
        const id = pathname.split('/').pop();
        return id === 'new' ? "Tambah Pengguna Baru" : "Ubah Detail Pengguna";
    }
    
    if (pathname.startsWith('/admin/reviews/export')) {
        return "Laporan Ulasan untuk Dicetak";
    }


    let baseTitle = baseTitles[pathname] || "Admin";

    if (unit) {
      baseTitle = `${baseTitle} - Unit ${unit}`;
    }
    
    return baseTitle;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');

  // Do not render layout for the main admin login page or export page
  if (pathname === '/admin' || pathname.startsWith('/admin/reviews/export')) {
    return <>{children}</>;
  }

  const currentPageTitle = getPageTitle(pathname, unit);
  const adminName = unit ? `Admin ${unit}` : "Admin Sistem";
  const adminEmail = unit ? `admin.${unit.toLowerCase().replace(/[^a-z0-9]/g, '')}@sim.rs` : "admin@sim.rs";


  return (
    <SidebarProvider>
    <Sidebar>
        <SidebarHeader>
        <div className="flex items-center gap-2">
            <TestTube className="size-8 text-primary" />
            <span className="text-xl font-semibold">PharmaFeedback</span>
        </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                 <SidebarGroupLabel>MENU UTAMA</SidebarGroupLabel>
                <SidebarMenu>
                    {adminMenuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton 
                                href={{ pathname: item.href, query: unit ? { unit } : {} }} 
                                tooltip={item.tooltip} 
                                isActive={pathname === item.href}
                                className="text-base font-medium h-12" 
                                asChild>
                                <Link href={{ pathname: item.href, query: unit ? { unit } : {} }}>
                                    <item.icon className="size-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton href="/" asChild className="text-base font-medium h-12">
                    <Link href="/">
                        <LogOut className="size-5" />
                        <span>Keluar</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/100x100.png" alt={adminName} data-ai-hint="person glasses" />
                <AvatarFallback>{adminName.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{adminName}</span>
                <span className="text-xs text-muted-foreground">{adminEmail}</span>
            </div>
        </div>
        </SidebarFooter>
    </Sidebar>
    <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h1 className="text-xl font-semibold">{currentPageTitle}</h1>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/50">
        {children}
        </main>
    </SidebarInset>
    </SidebarProvider>
  );
}
