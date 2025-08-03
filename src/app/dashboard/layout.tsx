
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
import { NotebookPen, History, User, LogOut, TestTube } from "lucide-react";


const menuItems = [
    { href: "/dashboard", icon: NotebookPen, label: "Beri Ulasan Baru" },
    { href: "/dashboard/history", icon: History, label: "Riwayat Ulasan" },
];

const accountMenuItems = [
    { href: "/dashboard/profile", icon: User, label: "Profil Saya" },
]

const pageTitles: { [key: string]: string } = {
    "/dashboard": "Ulasan Baru",
    "/dashboard/history": "Riwayat Ulasan Saya",
    "/dashboard/profile": "Profil Pengguna"
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const unit = searchParams.get("unit") || "Layanan";
  const name = searchParams.get("name") || "Pengguna";
  const currentPageTitle = pageTitles[pathname] || "Dasbor Pengguna";

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
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton 
                              href={{ pathname: item.href, query: { unit, name } }} 
                              tooltip={item.label} 
                              isActive={pathname === item.href}
                              className="text-base font-medium h-12"
                              asChild>
                                <Link href={{ pathname: item.href, query: { unit, name } }}>
                                    <item.icon className="size-5" />
                                    <span>{item.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
             <SidebarGroup>
                <SidebarGroupLabel>PENGATURAN</SidebarGroupLabel>
                <SidebarMenu>
                    {accountMenuItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <SidebarMenuButton 
                              href={{ pathname: item.href, query: { unit, name } }} 
                              tooltip={item.label} 
                              isActive={pathname === item.href}
                              className="text-base font-medium h-12"
                              asChild>
                                <Link href={{ pathname: item.href, query: { unit, name } }}>
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
                <SidebarMenuButton href="/login" asChild className="text-base font-medium h-12">
                <Link href="/login">
                    <LogOut className="size-5" />
                    <span>Keluar</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/100x100.png" alt={name} data-ai-hint="person portrait" />
                <AvatarFallback>{name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{name}</span>
                <span className="text-xs text-muted-foreground">{name.toLowerCase().replace(" ", ".")}@mail.com</span>
            </div>
        </div>
        </SidebarFooter>
    </Sidebar>
    <SidebarInset>
        <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger />
            <div className="flex-1">
                <h1 className="text-xl font-semibold">{currentPageTitle}</h1>
            </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
    </SidebarInset>
    </SidebarProvider>
  );
}
