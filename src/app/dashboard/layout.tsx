"use client";

import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Hospital,
  Eye,
  EyeOff,
  Loader2,
  PanelLeft,
} from "lucide-react";
import { userMenuItems } from "@/lib/constants";
import { getPageTitle } from "@/lib/utils";
import { getUserById } from "@/lib/actions";
import { User } from "@prisma/client";

function DashboardHeaderContent() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageTitle = getPageTitle(pathname);
  const isAnonymous = !searchParams.get("userId");

  const [isPatientMode, setIsPatientMode] = useState(false);

  if (isPatientMode) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-card px-6">
          <div className="flex items-center gap-3">
            <Hospital className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold">LayananReview RSUD</span>
          </div>
          <Button variant="outline" onClick={() => setIsPatientMode(false)}>
            <EyeOff className="mr-2" />
            Tutup Mode Pasien
          </Button>
        </header>
      </div>
    );
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-6">
      <SidebarTrigger className="md:hidden" />
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:inline-flex"
        onClick={() => toggleSidebar()}
      >
        <PanelLeft />
      </Button>
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      {isAnonymous && (
        <Button onClick={() => setIsPatientMode(true)}>
          <Eye className="mr-2" />
          Beralih ke Mode Pasien
        </Button>
      )}
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("userId");

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPatientMode, setIsPatientMode] = useState(false);

  const isAnonymous = !userId;
  const name = isAnonymous ? "Pasien Anonim" : currentUser?.name || "Pengguna";

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      getUserById(userId)
        .then((user) => {
          if (user) setCurrentUser(user);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isPatientMode) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b bg-card px-6">
          <div className="flex items-center gap-3">
            <Hospital className="h-8 w-8 text-primary" />
            <span className="text-2xl font-semibold">LayananReview RSUD</span>
          </div>
          <Button variant="outline" onClick={() => setIsPatientMode(false)}>
            <EyeOff className="mr-2" />
            Tutup Mode Pasien
          </Button>
        </header>
        <main className="flex-1 bg-background/50">
          <div className="container mx-auto max-w-4xl py-8 md:py-12">
            {children}
          </div>
        </main>
      </div>
    );
  }

  const getSidebarParams = () => {
    return new URLSearchParams(searchParams.toString());
  };
  
  const handleLogout = () => {
    // Navigate to the user login page
    router.push("/login/user");
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Hospital className="size-8 text-primary" />
            <span className="text-xl font-semibold">LayananReview RSUD</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>MENU PENGGUNA</SidebarGroupLabel>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    href={`${item.href}?${getSidebarParams()}`}
                    isActive={pathname === item.href}
                    className="h-12 text-base font-medium"
                    asChild
                  >
                    <Link href={`${item.href}?${getSidebarParams()}`}>
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
              <SidebarMenuButton
                onClick={handleLogout}
                asChild
                className="h-12 text-base font-medium"
              >
                <button type="button">
                  <LogOut className="size-5" />
                  <span>Keluar</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="flex items-center gap-3 rounded-md bg-sidebar-accent p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={currentUser?.avatar || undefined}
                alt={name}
                data-ai-hint="person"
              />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{name}</span>
              <span className="text-xs text-muted-foreground">
                {currentUser?.email || "Pengguna Kios"}
              </span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <DashboardHeaderContent />
        <main className="flex-1 overflow-y-auto bg-background/50 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
