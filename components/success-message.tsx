"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Download, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { FormState } from "@/components/subscription-page"

interface SuccessMessageProps {
  formState: FormState
  onReset: () => void
}

export function SuccessMessage({ formState, onReset }: SuccessMessageProps) {
  const { package: selectedPackage, paymentMethod, sellerInfo } = formState

  if (!selectedPackage || !paymentMethod || !sellerInfo) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
      >
        <Card className="border-green-500 shadow-lg">
          <CardHeader className="pb-4 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <CheckCircle2 className="h-20 w-20 text-green-500" />
            </motion.div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-green-600">Félicitations!</CardTitle>
            <CardDescription className="text-lg">Votre profil vendeur a été créé avec succès</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Récapitulatif</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Pack</div>
                <div className="font-medium">{selectedPackage.name}</div>

                <div className="text-gray-500">Prix</div>
                <div className="font-medium">{selectedPackage.price}€/mois</div>

                <div className="text-gray-500">Méthode de paiement</div>
                <div className="font-medium">{paymentMethod.name}</div>

                <div className="text-gray-500">Nom</div>
                <div className="font-medium">
                  {sellerInfo.firstName} {sellerInfo.lastName}
                </div>

                <div className="text-gray-500">Entreprise</div>
                <div className="font-medium">{sellerInfo.companyName}</div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
              <p className="text-green-800">
                Un email de confirmation a été envoyé à <span className="font-medium">{sellerInfo.email}</span>. Vous
                recevrez vos identifiants de connexion dans les prochaines minutes.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button className="w-full sm:w-auto bg-red-500 hover:bg-red-600" onClick={onReset}>
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Download className="mr-2 h-4 w-4" />
              Télécharger le reçu
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
