
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotebookPen, History, User, LogOut, TestTube } from "lucide-react";
import { ReviewProvider } from "@/context/ReviewContext";


const menuItems = [
    { href: "/dashboard", icon: NotebookPen, label: "Ulasan Baru" },
    { href: "/dashboard/history", icon: History, label: "Riwayat Saya" },
    { href: "/dashboard/profile", icon: User, label: "Profil" },
];

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
  const currentPageTitle = pageTitles[pathname] || "Dasbor Pengguna";

  return (
    <ReviewProvider>
        <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
            <div className="flex items-center gap-2">
                <TestTube className="size-7 text-primary" />
                <span className="text-lg font-semibold">PharmaFeedback</span>
            </div>
            </SidebarHeader>
            <SidebarContent>
            <SidebarMenu>
                {menuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton href={item.href} tooltip={item.label} isActive={pathname === item.href} asChild>
                            <Link href={item.href}>
                                <item.icon />
                                <span>{item.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton href="/login" asChild>
                    <Link href="/login">
                        <LogOut />
                        <span>Keluar</span>
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
            <div className="flex items-center gap-3 p-2 rounded-md bg-sidebar-accent">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="Pengguna" data-ai-hint="person portrait" />
                    <AvatarFallback>P</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">Pengguna 001</span>
                    <span className="text-xs text-muted-foreground">pengguna@mail.com</span>
                </div>
            </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
                <SidebarTrigger />
                <div className="flex-1">
                    <h1 className="text-lg font-semibold">{currentPageTitle}</h1>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </SidebarInset>
        </SidebarProvider>
    </ReviewProvider>
  );
}
