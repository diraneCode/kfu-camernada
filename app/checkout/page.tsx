"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCart } from "@/components/cart-provider"
import { formatPrice, generateId } from "@/lib/utils"
import { CreditCard, Loader2, QrCode, ShieldCheck, ShoppingBag, Ticket } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [qrCodes, setQrCodes] = useState<string[]>([])

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Vous n&apos;avez aucun article dans votre panier. Découvrez nos événements et produits pour commencer vos
            achats.
          </p>
          <Button onClick={() => router.push("/")} className="bg-red-600 hover:bg-red-700">
            Découvrir les événements
          </Button>
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Generate QR codes for tickets
    const codes = items
      .filter((item) => item.type) // Only for tickets
      .map(
        (item) =>
          `item:${item.id},name:${item.name},type:${item.type},quantity:${item.quantity},date:${new Date().toISOString()},id:${generateId()}`,
      )

    setQrCodes(codes)

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setShowSuccessDialog(true)
    }, 2000)
  }

  const handleCloseSuccess = () => {
    setShowSuccessDialog(false)
    clearCart()
    router.push("/mon-compte/billets")
  }

  return (
    <>
      <div className="container py-32">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Paiement</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de paiement</CardTitle>
                  <CardDescription>Complétez vos informations pour finaliser votre achat</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Informations personnelles</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="first-name">Prénom</Label>
                            <Input id="first-name" placeholder="Entrez votre prénom" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="last-name">Nom</Label>
                            <Input id="last-name" placeholder="Entrez votre nom" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" placeholder="Entrez votre email" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" placeholder="Entrez votre numéro de téléphone" required />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Méthode de paiement</h3>
                        <Tabs
                          defaultValue="card"
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="w-full"
                        >
                          <TabsList className="grid grid-cols-3 mb-4">
                            <TabsTrigger value="card">
                              <CreditCard className="h-4 w-4 mr-2" />
                              Carte
                            </TabsTrigger>
                            <TabsTrigger value="paypal">PayPal</TabsTrigger>
                            <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                          </TabsList>
                          <TabsContent value="card" className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="card-number">Numéro de carte</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="expiry">Date d&apos;expiration</Label>
                                <div className="flex gap-2">
                                  <Select defaultValue="01">
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="MM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 12 }, (_, i) => {
                                        const month = (i + 1).toString().padStart(2, "0")
                                        return (
                                          <SelectItem key={month} value={month}>
                                            {month}
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                  <Select defaultValue="2024">
                                    <SelectTrigger className="w-full">
                                      <SelectValue placeholder="YYYY" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Array.from({ length: 10 }, (_, i) => {
                                        const year = (2024 + i).toString()
                                        return (
                                          <SelectItem key={year} value={year}>
                                            {year}
                                          </SelectItem>
                                        )
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" required />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="name-on-card">Nom sur la carte</Label>
                              <Input id="name-on-card" placeholder="Entrez le nom sur la carte" required />
                            </div>
                          </TabsContent>
                          <TabsContent value="paypal" className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                              <p className="mb-4">Vous serez redirigé vers PayPal pour compléter votre paiement.</p>
                              <Image
                                src="/placeholder.svg?height=60&width=200"
                                alt="PayPal"
                                width={200}
                                height={60}
                                className="mx-auto"
                              />
                            </div>
                          </TabsContent>
                          <TabsContent value="apple" className="space-y-4">
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center">
                              <p className="mb-4">Vous serez redirigé vers Apple Pay pour compléter votre paiement.</p>
                              <Image
                                src="/placeholder.svg?height=60&width=200"
                                alt="Apple Pay"
                                width={200}
                                height={60}
                                className="mx-auto"
                              />
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>

                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Vos informations de paiement sont sécurisées et cryptées
                        </span>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" size="lg" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? "Traitement en cours..." : `Payer ${formatPrice(totalPrice)}`}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      <div className="relative h-16 w-16 overflow-hidden rounded-md bg-gray-100">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <h3 className="font-medium">{item.name}</h3>
                        {item.type && <p className="text-sm text-gray-500">{item.type}</p>}
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-sm">
                            {item.quantity} x {formatPrice(item.price)}
                          </span>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="space-y-2 w-full">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>{formatPrice(totalPrice * 0.15)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(totalPrice * 1.15)}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Paiement réussi!</DialogTitle>
            <DialogDescription>Votre commande a été traitée avec succès.</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <Ticket className="h-16 w-16 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Merci pour votre achat!</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                Vos billets sont maintenant disponibles dans votre compte.
              </p>

              {qrCodes.length > 0 && (
                <div className="w-full bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                  <div className="flex items-center mb-2">
                    <QrCode className="h-5 w-5 mr-2 text-gray-500" />
                    <h4 className="font-medium">Vos codes QR</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Vos billets ont été générés avec succès. Vous pouvez les retrouver dans votre compte.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
          <DialogFooter>
            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={handleCloseSuccess}>
              Voir mes billets
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
