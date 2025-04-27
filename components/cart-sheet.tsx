"use client"

import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "./cart-provider"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

export default function CartSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart()
  const { toast } = useToast()

  const handleRemoveItem = (id: string) => {
    removeItem(id)
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré de votre panier",
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-2 pr-6">
          <SheetTitle className="flex items-center gap-2 text-red-600">
            <ShoppingCart className="h-5 w-5" />
            Votre Panier ({totalItems})
          </SheetTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12">
            <div className="relative w-24 h-24 mb-4">
              <div className="absolute inset-0 bg-red-100 rounded-full opacity-50 animate-pulse"></div>
              <ShoppingCart className="w-12 h-12 absolute inset-0 m-auto text-red-600" />
            </div>
            <h3 className="text-xl font-semibold">Votre panier est vide</h3>
            <p className="text-gray-500 text-center max-w-xs">
              Découvrez nos événements et produits pour ajouter quelque chose à votre panier
            </p>
            <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => onOpenChange(false)}>
              Continuer mes achats
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto py-6">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-4 py-4 border-b border-gray-100 dark:border-gray-800"
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-600"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {item.type && <p className="text-sm text-gray-500">{item.type}</p>}
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="grid gap-2">
                <Link href="/checkout" onClick={() => onOpenChange(false)}>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Passer à la caisse</Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
                  Continuer mes achats
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
