"use client"

import { motion } from "framer-motion"
import { Check, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Package } from "@/components/subscription-page"

const packages: Package[] = [
  {
    id: "basic",
    name: "Débutant",
    price: 29,
    features: [
      "Profil vendeur de base",
      "Jusqu'à 10 produits",
      "Support par email",
      "Paiements standards",
      "Statistiques basiques",
    ],
  },
  {
    id: "pro",
    name: "Professionnel",
    price: 79,
    popular: true,
    features: [
      "Profil vendeur personnalisé",
      "Jusqu'à 100 produits",
      "Support prioritaire",
      "Paiements avancés",
      "Statistiques détaillées",
      "Outils marketing de base",
      "Remises sur les frais",
    ],
  },
  {
    id: "enterprise",
    name: "Entreprise",
    price: 199,
    features: [
      "Profil vendeur premium",
      "Produits illimités",
      "Support dédié 24/7",
      "Paiements internationaux",
      "Analyses avancées",
      "Suite marketing complète",
      "Frais réduits",
      "API personnalisée",
      "Intégrations sur mesure",
    ],
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

interface PackageSelectionProps {
  onSelect: (pkg: Package) => void
}

export function PackageSelection({ onSelect }: PackageSelectionProps) {
  return (
    <div className="space-y-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {packages.map((pkg) => (
          <motion.div key={pkg.id} variants={item}>
            <Card className={`relative h-full flex flex-col ${pkg.popular ? "border-red-500 shadow-lg" : ""}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <Badge className="bg-red-500 hover:bg-red-600">
                    <Star className="h-3.5 w-3.5 mr-1 fill-white" />
                    Populaire
                  </Badge>
                </div>
              )}
              <CardHeader className={pkg.popular ? "pt-6" : ""}>
                <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold">{pkg.price}€</span>
                  <span className="text-gray-500"> /mois</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-red-500 mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => onSelect(pkg)}
                  className={`w-full ${pkg.popular ? "bg-red-500 hover:bg-red-600" : ""}`}
                >
                  Sélectionner
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
