"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PackageSelection } from "@/components/package-selection"
import { PaymentMethodSelection } from "@/components/payment-method-selection"
import { SellerInformationForm } from "@/components/seller-information-form"
import { SuccessMessage } from "@/components/success-message"
import { ErrorMessage } from "@/components/error-message"

export type Package = {
  id: string
  name: string
  price: number
  features: string[]
  popular?: boolean
}

export type PaymentMethod = {
  id: string
  name: string
  icon: React.ReactNode
}

export type FormState = {
  package: Package | null
  paymentMethod: PaymentMethod | null
  sellerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    companyName: string
    address: string
    city: string
    country: string
    postalCode: string
    taxId: string
  } | null
}

type SubscriptionStep = "package" | "payment" | "information" | "success" | "error"

export default function SubscriptionPage() {
  const [currentStep, setCurrentStep] = useState<SubscriptionStep>("package")
  const [formState, setFormState] = useState<FormState>({
    package: null,
    paymentMethod: null,
    sellerInfo: null,
  })

  const handlePackageSelect = (selectedPackage: Package) => {
    setFormState({ ...formState, package: selectedPackage })
    setCurrentStep("payment")
  }

  const handlePaymentMethodSelect = (paymentMethod: PaymentMethod) => {
    setFormState({ ...formState, paymentMethod })
    setCurrentStep("information")
  }

  const handleFormSubmit = async (sellerInfo: FormState["sellerInfo"]) => {
    setFormState({ ...formState, sellerInfo })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Random success/error for demo purposes
      if (Math.random() > 0.3) {
        setCurrentStep("success")
      } else {
        setCurrentStep("error")
      }
    } catch (error) {
      setCurrentStep("error")
    }
  }

  const resetForm = () => {
    setFormState({
      package: null,
      paymentMethod: null,
      sellerInfo: null,
    })
    setCurrentStep("package")
  }

  const retrySubmission = () => {
    setCurrentStep("information")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold text-center mb-2">Créez Votre Profil Vendeur</h1>
        <p className="text-gray-600 text-center mb-12">
          Choisissez un pack qui correspond à vos besoins et commencez à vendre dès aujourd'hui
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {currentStep === "package" && (
          <motion.div
            key="package"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PackageSelection onSelect={handlePackageSelect} />
          </motion.div>
        )}

        {currentStep === "payment" && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PaymentMethodSelection
              selectedPackage={formState.package!}
              onSelect={handlePaymentMethodSelect}
              onBack={() => setCurrentStep("package")}
            />
          </motion.div>
        )}

        {currentStep === "information" && (
          <motion.div
            key="information"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SellerInformationForm
              selectedPackage={formState.package!}
              selectedPaymentMethod={formState.paymentMethod!}
              onSubmit={handleFormSubmit}
              onBack={() => setCurrentStep("payment")}
            />
          </motion.div>
        )}

        {currentStep === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SuccessMessage formState={formState} onReset={resetForm} />
          </motion.div>
        )}

        {currentStep === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ErrorMessage onRetry={retrySubmission} onReset={resetForm} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
