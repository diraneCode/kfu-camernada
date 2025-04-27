"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Menu, Search, X, MessageSquare, Package, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardSidebar } from "./sidebar"

export function DashboardHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet>
      <div className="flex-1">
        {showSearch ? (
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Rechercher..." className="w-full pl-8 md:w-[300px]" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setShowSearch(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fermer la recherche</span>
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => setShowSearch(true)}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Rechercher</span>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center">3</Badge>
              <span className="sr-only">Notifications</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="font-medium">Notifications</h4>
              <Button variant="ghost" size="sm" className="text-xs">
                Marquer tout comme lu
              </Button>
            </div>
            <div className="space-y-2 py-2">
              {[
                {
                  icon: Package,
                  title: "Nouvelle commande #1234",
                  description: "Une nouvelle commande a été passée",
                  time: "Il y a 5 minutes",
                },
                {
                  icon: User,
                  title: "Nouvel utilisateur",
                  description: "Jean Dupont s'est inscrit",
                  time: "Il y a 1 heure",
                },
                {
                  icon: MessageSquare,
                  title: "Nouveau témoignage",
                  description: "Marie a laissé un témoignage 5 étoiles",
                  time: "Il y a 3 heures",
                },
              ].map((notification, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full" variant="outline">
              Voir toutes les notifications
            </Button>
          </PopoverContent>
        </Popover>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profil</DropdownMenuItem>
            <DropdownMenuItem>Paramètres</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se déconnecter</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
