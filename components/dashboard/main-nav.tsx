"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        href="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Boutique
      </Link>
      <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Statistiques
      </Link>
    </nav>
  )
}
