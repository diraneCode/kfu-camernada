'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

interface RedirectIfAuthenticatedProps {
  redirectTo?: string
  children: React.ReactNode
}

export function RedirectIfAuthenticated({ redirectTo = '/', children }: RedirectIfAuthenticatedProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showRedirectMessage, setShowRedirectMessage] = useState(false)

  useEffect(() => {
    if (!loading && user) {
      // Petit délai pour afficher le message joliment
      setTimeout(() => {
        setShowRedirectMessage(true)
      }, 300)
    }
  }, [user, loading])

  const handleRedirect = () => {
    router.replace(redirectTo)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
      </div>
    )
  }

  if (user && showRedirectMessage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* SVG illustration */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-32 text-red-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0-2 1-3 3-3s3 1 3 3v2c0 2-1 3-3 3s-3-1-3-3v-2zM12 11v2c0 2-1 3-3 3s-3-1-3-3v-2c0-2 1-3 3-3s3 1 3 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12c0 4-5 7-9 7s-9-3-9-7 5-7 9-7 9 3 9 7z" />
          </svg>

          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Vous êtes déjà authentifié !
          </h1>

          <p className="text-gray-600 mb-8 text-center">
            Vous êtes déjà connecté. Cliquez ci-dessous pour retourner à l'accueil.
          </p>

          {/* Bouton */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRedirect}
            className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold text-lg shadow-md hover:bg-red-600 transition-all"
          >
            Retourner à l'accueil
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
