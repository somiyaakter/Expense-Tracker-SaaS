"use client"
import { ArrowLeftRight, Calendar, Home, Inbox, LayoutDashboard, RefreshCw, Search, Settings, Tag, Wallet, WalletMinimal } from "lucide-react"

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
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import HeaderLogo from "./header-logo"
import UserButton from "./user-button"
import { SidebarUser } from "./sidebar-user"
import { usePathname } from "next/navigation"
import Link from "next/link"

// Menu items.

const items = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: LayoutDashboard,
    
  },
  {
    title:"Accounts",
    url: "/accounts",
    icon: WalletMinimal,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: Tag,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: RefreshCw,
  },
  
]
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

const pathname = usePathname();


    
  return (
    <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
            </SidebarHeader>
      <SidebarContent className="px-3">
        
            <SidebarMenu>
              <SidebarMenuItem className="border-b pb-3">
                  <SidebarMenuButton  asChild>
                    <a href="/">

                    
                    <span><Wallet className="fill-primary/60 text-primary" /></span>
        <span className="font-semibold  text-primary text-xl">Expensify</span></a>
                  </SidebarMenuButton>
        
                  
                </SidebarMenuItem>
              {items.map((item) =>{
                const isActive = pathname == item.url
                return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className={isActive? "bg-primary text-white":""} asChild  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )})}
            </SidebarMenu>
          
      </SidebarContent>
      <SidebarFooter>
        
        <SidebarUser />
        </SidebarFooter>
        {/* <SidebarRail/> */}
        <SidebarTrigger  className="mt-3 absolute -right-4 z-50 bg-white shadow-0" />
    </Sidebar>
  )
}