import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Header from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 pt-0">
          <Header />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
