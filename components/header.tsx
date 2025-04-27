"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Menu, ShoppingCart, Sparkles, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useCart } from "./cart-provider"
import CartSheet from "./cart-sheet"
import { useAuth } from "@/contexts/AuthContext"
import Image from "next/image"

const routes = [
  { href: "/", label: "Accueil" },
  { href: "/evenements", label: "Événements" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/membres", label: "Membres" },
  { href: "/blog", label: "Blog" },
  { href: "/a-propos", label: "À propos" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { totalItems, isOpen, setIsOpen } = useCart();
  const { profile, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-950/80" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-red-600">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-300 to-red-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-red-500" />
            </div>
          </div>
          <span className="relative">
            <span className="absolute -inset-1 -z-10 rounded-lg bg-red-100 blur-sm dark:bg-red-900/50"></span>
            CamerCanada
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-red-600",
                pathname === route.href ? "text-red-600" : "text-gray-700 dark:text-gray-200",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {profile && <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Button>}

          {profile && <Link href="/mon-compte">
            <Button variant="ghost" size="icon">
              {
                profile.avatar_url ? <Image src={profile.avatar_url} alt={profile.nom || "avatar"} width={25} height={25} className="w-full h-full rounded-full" /> : <User className="h-5 w-5" />
              }
            </Button>
          </Link>}

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-red-600 p-2 rounded-md",
                        pathname === route.href
                          ? "bg-red-50 text-red-600 dark:bg-red-950/20"
                          : "text-gray-700 dark:text-gray-200",
                      )}
                    >
                      {route.label}
                    </Link>
                  ))}
                  <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                  {!profile ? (
                    <>
                      <Link href="/connexion" className="text-lg font-medium transition-colors hover:text-red-600 p-2">
                        Connexion
                      </Link>
                      <Link href="/inscription" className="text-lg font-medium transition-colors hover:text-red-600 p-2">
                        Inscription
                      </Link>
                    </>
                  ) : (
                    <Button
                      variant="default"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={signOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {!profile ? <div className="hidden md:flex gap-2">
            <Link href="/connexion">
              <Button variant="ghost">Connexion</Button>
            </Link>
            <Link href="/inscription">
              <Button variant="default" className="bg-red-600 hover:bg-red-700">
                Inscription
              </Button>
            </Link>
          </div> : null}
        </div>
      </div>
      <CartSheet open={isOpen} onOpenChange={setIsOpen} />
    </header>
  )
}
