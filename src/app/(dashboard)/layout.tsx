import React from 'react'
import Header from '@/components/header'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from '@/components/ui/separator'

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <>
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 pt-0">
              <Header />
                {children}
            </div>
      </SidebarInset>
    </SidebarProvider>
    {/* <main className='min-h-screen'>{children}</main> */}
    </>
  )
}
