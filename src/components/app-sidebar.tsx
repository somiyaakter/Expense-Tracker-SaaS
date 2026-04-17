"use client";
import {
  LayoutDashboard,
  RefreshCw,
  Tag,
  Wallet,
  WalletMinimal,
  HelpCircle,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarUser } from "./sidebar-user";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const workspaceRoutes = [
  { title: "Overview", url: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: RefreshCw },
  { title: "Accounts", url: "/accounts", icon: WalletMinimal },
  { title: "Categories", url: "/categories", icon: Tag },
];

const supportRoutes = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help & support", url: "/help", icon: HelpCircle },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props} className="border-r border-border/60">
      {/* Brand */}
      <SidebarHeader className="border-b border-border/60">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="hover:bg-transparent active:bg-transparent data-[state=open]:hover:bg-transparent"
            >
              <Link href="/" className="flex items-center gap-2.5">
                <div className="size-8 shrink-0 rounded-lg bg-gradient-to-br from-primary to-teal-900 flex items-center justify-center shadow-sm shadow-primary/30">
                  <Wallet className="size-4 text-white" />
                </div>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold text-base tracking-tight">
                    Expensify
                  </span>
                  <span className="truncate text-[11px] text-muted-foreground">
                    Personal workspace
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground/70 font-semibold">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {workspaceRoutes.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "relative h-9 rounded-lg font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors",
                        isActive &&
                          "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                      )}
                    >
                      <Link href={item.url}>
                        {isActive && !collapsed && (
                          <span
                            aria-hidden
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-primary"
                          />
                        )}
                        <item.icon
                          className={cn(
                            "shrink-0 size-4",
                            isActive && "text-primary"
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.08em] text-muted-foreground/70 font-semibold">
            Support
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {supportRoutes.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "h-9 rounded-lg font-medium text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors",
                        isActive &&
                          "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className="shrink-0 size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Upgrade card — hidden when collapsed */}
        {!collapsed && (
          <div className="mx-2 mt-auto mb-2 rounded-xl p-4 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent ring-1 ring-primary/15">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-teal-900 flex items-center justify-center mb-3 shadow-sm shadow-primary/30">
              <Wallet className="size-4 text-white" />
            </div>
            <p className="text-sm font-semibold mb-1">Upgrade to Pro</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
              Unlock unlimited accounts and advanced insights.
            </p>
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center w-full h-8 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Upgrade
            </Link>
          </div>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-2">
        <SidebarUser />
      </SidebarFooter>

      <SidebarTrigger className="mt-4 absolute -right-3.5 z-50 size-7 rounded-full bg-card shadow-md border border-border hover:bg-secondary" />
    </Sidebar>
  );
}
