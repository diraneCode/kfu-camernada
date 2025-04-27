'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

interface RequireAuthProps {
  children: React.ReactNode
}

export function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [showAuthMessage, setShowAuthMessage] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      // Délai pour afficher le message joliment
      setTimeout(() => {
        setShowAuthMessage(true)
      }, 300)
    }
  }, [user, loading])

  const handleRedirect = () => {
    router.push('/connexion')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-red-500"></div>
      </div>
    )
  }

  if (!user && showAuthMessage) {
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12H9m12 0c0 5-4 9-9 9s-9-4-9-9 4-9 9-9 9 4 9 9z" />
          </svg>

          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Authentification requise
          </h1>

          <p className="text-gray-600 mb-8 text-center">
            Vous devez être connecté pour accéder à cette page.
          </p>

          {/* Bouton */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRedirect}
            className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold text-lg shadow-md hover:bg-red-600 transition-all"
          >
            Se connecter
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
