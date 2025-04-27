"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  Users,
  Calendar,
  Store,
  FileText,
  ShoppingCart,
  MessageSquare,
  Settings,
  Menu,
  Package,
} from "lucide-react"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Vue d'ensemble",
      icon: BarChart3,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Utilisateurs",
      icon: Users,
      href: "/dashboard/users",
      active: pathname === "/dashboard/users",
    },
    {
      label: "Événements",
      icon: Calendar,
      href: "/dashboard/events",
      active: pathname === "/dashboard/events",
    },
    {
      label: "Vendeurs",
      icon: Store,
      href: "/dashboard/sellers",
      active: pathname === "/dashboard/sellers",
    },
    {
      label: "Blog",
      icon: FileText,
      href: "/dashboard/blog",
      active: pathname === "/dashboard/blog",
    },
    {
      label: "Commandes",
      icon: ShoppingCart,
      href: "/dashboard/orders",
      active: pathname === "/dashboard/orders",
    },
    {
      label: "Témoignages",
      icon: MessageSquare,
      href: "/dashboard/testimonials",
      active: pathname === "/dashboard/testimonials",
    },
    {
      label: "Paramètres",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <MobileNav routes={routes} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <nav className={cn("hidden md:block border-r bg-background h-screen w-64 p-4", className)}>
        <div className="flex items-center gap-2 mb-8 px-2">
          <Package className="h-6 w-6" />
          <span className="font-bold text-xl">AdminPanel</span>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-1 py-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  route.active ? "bg-accent text-accent-foreground" : "transparent",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.label}
              </Link>
            ))}
          </div>
        </ScrollArea>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Admin</p>
                <p className="text-xs text-muted-foreground">admin@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

interface MobileNavProps {
  routes: {
    label: string
    icon: React.ElementType
    href: string
    active: boolean
  }[]
  setOpen: (open: boolean) => void
}

function MobileNav({ routes, setOpen }: MobileNavProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-2 border-b h-14 px-4">
        <Package className="h-6 w-6" />
        <span className="font-bold text-xl">AdminPanel</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                route.active ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
            <div className="text-sm">
              <p className="font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
