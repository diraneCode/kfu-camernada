"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8">
          <div className="text-[150px] font-bold text-primary opacity-10 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-red-500">
              404
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Page introuvable</h1>
        <p className="text-gray-600 mb-8">
          Oups ! La page que vous recherchez semble avoir disparu dans les rues de notre communauté.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto flex items-center group relative overflow-hidden">
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-primary to-red-500"></span>
              <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-red-500 to-primary"></span>
              <span className="relative flex items-center z-10">
                <Home className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </span>
            </Button>
          </Link>
          <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour en arrière
          </Button>
        </div>

        <div className="mt-12 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            Vous cherchez quelque chose de spécifique ? Consultez notre{" "}
            <Link href="/forum" className="text-primary hover:underline">
              forum
            </Link>{" "}
            ou contactez-nous via la page{" "}
            <Link href="/about" className="text-primary hover:underline">
              À propos
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

