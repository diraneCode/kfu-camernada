"use client"

import { motion } from "framer-motion"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  onRetry: () => void
  onReset: () => void
}

export function ErrorMessage({ onRetry, onReset }: ErrorMessageProps) {
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
        <Card className="border-red-500 shadow-lg">
          <CardHeader className="pb-4 text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-center mb-4"
            >
              <AlertCircle className="h-20 w-20 text-red-500" />
            </motion.div>
            <CardTitle className="text-2xl sm:text-3xl font-bold text-red-600">Une erreur est survenue</CardTitle>
            <CardDescription className="text-lg">Nous n'avons pas pu finaliser votre inscription</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
              <p className="text-red-800">
                Il semble qu'un problème technique soit survenu lors du traitement de votre demande. Veuillez réessayer
                ou contacter notre support si le problème persiste.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Que faire maintenant?</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Vérifiez votre connexion internet</li>
                <li>Essayez de soumettre à nouveau votre formulaire</li>
                <li>Contactez notre support si le problème persiste</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3">
            <Button className="w-full sm:w-auto bg-red-500 hover:bg-red-600" onClick={onRetry}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Réessayer
            </Button>
            <Button variant="outline" className="w-full sm:w-auto" onClick={onReset}>
              <Home className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
