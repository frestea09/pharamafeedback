
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
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, MessageSquare, LogOut, FileText } from "lucide-react";
import { LayananReviewLogo } from "@/components/icons";

const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dasbor", tooltip: "Dasbor" },
    { href: "/admin/reviews", icon: MessageSquare, label: "Semua Ulasan", tooltip: "Ulasan" },
    { href: "/admin/users", icon: Users, label: "Kelola Pengguna", tooltip: "Pengguna" },
];

const pageTitles: { [key: string]: string } = {
    "/admin": "Dasbor Admin",
    "/admin/reviews": "Semua Ulasan",
    "/admin/users": "Kelola Pengguna"
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPageTitle = pageTitles[pathname] || "Admin";

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
           <div className="flex items-center gap-2">
             <LayananReviewLogo className="size-7 text-primary" />
             <span className="text-lg font-semibold">LayananReview</span>
           </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
                 <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton href={item.href} tooltip={item.tooltip} isActive={pathname === item.href} asChild>
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
                <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" data-ai-hint="person glasses" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">Pengguna Admin</span>
                <span className="text-xs text-muted-foreground">admin@layanan.com</span>
              </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
                <h1 className="text-lg font-semibold">{currentPageTitle}</h1>
            </div>
             {pathname === '/admin/reviews' && (
                <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-3.5 w-3.5" />
                    <span>Ekspor</span>
                </Button>
            )}
             {pathname === '/admin/users' && (
                <Button size="sm" className="gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>Tambah Pengguna</span>
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
