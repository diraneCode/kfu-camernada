import type React from "react"
import { MainNav } from "@/components/dashboard/main-nav"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { UserNav } from "@/components/dashboard/user-nav"
import { ThemeModeToggle } from "@/components/theme-mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <div className="flex items-center gap-4">
            <ThemeModeToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <div className="px-2 flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <SidebarNav className="hidden md:block" />
        <main className="flex w-full flex-col overflow-hidden p-4 md:py-8 md:px-0">{children}</main>
      </div>
    </div>
  )
}
