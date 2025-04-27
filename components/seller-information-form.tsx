"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Landmark, Wallet, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Package, PaymentMethod, FormState } from "@/components/subscription-page"

interface SellerInformationFormProps {
  selectedPackage: Package
  selectedPaymentMethod: PaymentMethod
  onSubmit: (sellerInfo: FormState["sellerInfo"]) => void
  onBack: () => void
}

export function SellerInformationForm({
  selectedPackage,
  selectedPaymentMethod,
  onSubmit,
  onBack,
}: SellerInformationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    taxId: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSubmit(formData)
    setIsSubmitting(false)
  }

  const getPaymentIcon = () => {
    switch (selectedPaymentMethod.id) {
      case "card":
        return <CreditCard className="h-5 w-5 text-red-500" />
      case "bank":
        return <Landmark className="h-5 w-5 text-red-500" />
      case "wallet":
        return <Wallet className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4" disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
        <div>
          <h2 className="text-2xl font-bold">Informations du vendeur</h2>
          <p className="text-gray-500">Complétez vos informations pour finaliser votre inscription</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Récapitulatif</CardTitle>
          <CardDescription>
            <div className="flex flex-col sm:flex-row sm:justify-between mt-2">
              <div className="mb-2 sm:mb-0">
                <span className="font-medium">Pack:</span> {selectedPackage.name}
              </div>
              <div className="mb-2 sm:mb-0">
                <span className="font-medium">Prix:</span> {selectedPackage.price}€/mois
              </div>
              <div className="flex items-center">
                <span className="font-medium mr-2">Paiement:</span>
                {getPaymentIcon()}
                <span className="ml-1">{selectedPaymentMethod.name}</span>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Numéro de TVA</Label>
                  <Input id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="md:col-span-2"
              >
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
                <div className="space-y-2">
                  <Label htmlFor="city">Ville</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Code postal</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement en cours...
                  </>
                ) : (
                  "Finaliser l'inscription"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
