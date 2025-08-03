
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
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
import { Home, LogOut, FileText, UserCircle, TestTube, Eye, EyeOff } from "lucide-react";
import { useUserStore } from "@/store/userStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || "Pengguna";
  const { getUserByEmail } = useUserStore();
  const currentUser = getUserByEmail(`${name.toLowerCase().replace(" ", ".")}@example.com`);

  const menuItems = [
    { href: "/dashboard", icon: Home, label: "Beri Ulasan Baru" },
    { href: "/dashboard/history", icon: FileText, label: "Riwayat Ulasan" },
    { href: "/dashboard/profile", icon: UserCircle, label: "Profil Saya" },
  ];
  
  const [isPatientMode, setIsPatientMode] = useState(false);

  const getPageTitle = (path: string) => {
    if (path.includes('/history')) return "Riwayat Ulasan";
    if (path.includes('/profile')) return "Pengaturan Profil";
    return "Formulir Ulasan Pasien";
  }
  
  if (isPatientMode) {
      return (
         <div className="flex flex-col min-h-screen">
             <header className="flex h-20 items-center justify-between border-b bg-card px-6 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <TestTube className="size-8 text-primary" />
                    <span className="text-2xl font-semibold">PharmaFeedback</span>
                </div>
                <Button variant="outline" onClick={() => setIsPatientMode(false)}>
                    <EyeOff className="mr-2"/>
                    Tutup Mode Pasien
                </Button>
            </header>
            <main className="flex-1 bg-background/50">
                <div className="container mx-auto max-w-4xl py-8 md:py-12">
                    {children}
                </div>
            </main>
         </div>
      )
  }

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
                 <SidebarGroupLabel>MENU PENGGUNA</SidebarGroupLabel>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton 
                                href={`${item.href}?name=${name}`}
                                isActive={pathname === item.href}
                                className="text-base font-medium h-12" 
                                asChild>
                                <Link href={`${item.href}?name=${name}`}>
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
                <SidebarMenuButton href="/login/user" asChild className="text-base font-medium h-12">
                    <Link href="/login/user">
                        <LogOut className="size-5" />
                        <span>Keluar</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent">
             <Avatar className="h-10 w-10">
                <AvatarImage src={currentUser?.avatar} alt={name} data-ai-hint="person" />
                <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{name}</span>
                <span className="text-xs text-muted-foreground">{currentUser?.email}</span>
            </div>
        </div>
        </SidebarFooter>
    </Sidebar>
    <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h1 className="text-xl font-semibold">{getPageTitle(pathname)}</h1>
            </div>
            {pathname === '/dashboard' && (
                <Button onClick={() => setIsPatientMode(true)}>
                    <Eye className="mr-2" />
                    Beralih ke Mode Pasien
                </Button>
            )}
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background/50">
        {children}
        </main>
    </SidebarInset>
    </SidebarProvider>
  );
}
