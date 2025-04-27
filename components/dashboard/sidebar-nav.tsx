"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  CalendarIcon,
  LayoutDashboard,
  MessageSquare,
  ScrollText,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react"

interface SidebarNavProps {
  className?: string
}

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Utilisateurs",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Évènements",
    href: "/dashboard/events",
    icon: CalendarIcon,
  },
  {
    title: "Vendeurs",
    href: "/dashboard/vendors",
    icon: Store,
  },
  {
    title: "Blog",
    href: "/dashboard/blog",
    icon: ScrollText,
  },
  {
    title: "Commandes",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Témoignages",
    href: "/dashboard/testimonials",
    icon: MessageSquare,
  },
  {
    title: "Paramètres",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {sidebarItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-3 py-2 text-sm font-medium",
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-primary",
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  )
}
