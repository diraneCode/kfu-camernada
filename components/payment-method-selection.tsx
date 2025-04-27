"use client"

import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Landmark, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Package, PaymentMethod } from "@/components/subscription-page"

const paymentMethods: PaymentMethod[] = [
  {
    id: "card",
    name: "Carte Bancaire",
    icon: <CreditCard className="h-10 w-10 text-red-500" />,
  },
  {
    id: "bank",
    name: "Virement Bancaire",
    icon: <Landmark className="h-10 w-10 text-red-500" />,
  },
  {
    id: "wallet",
    name: "Portefeuille Électronique",
    icon: <Wallet className="h-10 w-10 text-red-500" />,
  },
]

interface PaymentMethodSelectionProps {
  selectedPackage: Package
  onSelect: (method: PaymentMethod) => void
  onBack: () => void
}

export function PaymentMethodSelection({ selectedPackage, onSelect, onBack }: PaymentMethodSelectionProps) {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Choisissez votre méthode de paiement</h2>
          <p className="text-gray-500">
            Pack sélectionné: {selectedPackage.name} - {selectedPackage.price}€/mois
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="cursor-pointer hover:border-red-500 transition-all duration-300 h-full flex flex-col"
              onClick={() => onSelect(method)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-center">{method.icon}</div>
              </CardHeader>
              <CardContent className="text-center flex-grow">
                <CardTitle className="text-xl mb-2">{method.name}</CardTitle>
                <CardDescription>Paiement sécurisé et rapide</CardDescription>
              </CardContent>
              <CardFooter>
                <Button onClick={() => onSelect(method)} className="w-full">
                  Sélectionner
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
