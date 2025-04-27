"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function RegistrationSuccess() {
  const [isLoaded, setIsLoaded] = useState(false)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  // Animation de confettis style Vercel
  useEffect(() => {
    if (!confettiCanvasRef.current) return

    const canvas = confettiCanvasRef.current
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    // Fonction pour lancer les confettis
    const launchConfetti = () => {
      const colors = ["#9c5de4", "#6366f1", "#4f46e5", "#4338ca", "#3730a3"]

      // Animation principale - explosion centrale
      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors,
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
        shapes: ["circle", "square"],
      })

      // Petites explosions secondaires
      setTimeout(() => {
        myConfetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.65 },
          colors: colors,
        })
      }, 250)

      setTimeout(() => {
        myConfetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.65 },
          colors: colors,
        })
      }, 400)
    }

    // Lancer l'animation après un court délai
    const timer = setTimeout(() => {
      launchConfetti()
    }, 800)

    return () => {
      clearTimeout(timer)
    }
  }, [isLoaded])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex mt-5 flex-col items-center justify-center p-4">
      {/* Fond animé amélioré */}
      <div className="fixed inset-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100" />

        {/* Motif géométrique */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M 0 10 L 40 10 M 10 0 L 10 40 M 0 20 L 40 20 M 20 0 L 20 40 M 0 30 L 40 30 M 30 0 L 30 40"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Cercles décoratifs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full filter blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-300/20 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-300/20 rounded-full filter blur-3xl" />
      </div>

      {/* Canvas pour l'animation de confettis */}
      <canvas ref={confettiCanvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md z-20"
      >
        <Card className="p-8 shadow-xl bg-white/90 backdrop-blur-sm border-0 overflow-hidden relative">
          {/* Effet de brillance qui se déplace */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-transparent via-purple-200/30 to-transparent skew-x-12"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 3,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <div className="relative">
                {/* Animation de l'icône - CORRECTION DE L'ERREUR */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.6,
                  }}
                  className="absolute inset-0 bg-green-100 rounded-full"
                  style={{ width: "80px", height: "80px" }}
                />
                <motion.div
                  animate={{
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                >
                  <CheckCircle className="w-20 h-20 text-green-500 relative z-10" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">Inscription Réussie!</h1>
              <p className="text-center text-gray-600 mb-6">Bienvenue dans notre communauté de jeunes passionnés!</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100"
            >
              <div className="flex items-start">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2,
                  }}
                >
                  <Mail className="w-6 h-6 text-blue-500 mr-3 mt-0.5" />
                </motion.div>
                <div>
                  <h3 className="font-medium text-blue-700">Vérifie ton email</h3>
                  <p className="text-sm text-blue-600 mt-1">
                    Nous t&apos;avons envoyé un lien de confirmation. Clique sur ce lien pour activer ton compte.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transition-all duration-300 shadow-md hover:shadow-lg group"
              >
                <Link href="https://mail.google.com" target="_blank">
                  <motion.div
                    className="flex items-center justify-center w-full"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Ouvrir ma boîte mail
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 2.5,
                      }}
                    >
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </Link>
              </Button>

              <motion.p variants={itemVariants} className="text-sm text-center text-gray-500">
                Tu n&apos;as pas reçu d&apos;email?
                <motion.span
                  whileHover={{ color: "#6366f1", scale: 1.05 }}
                  className="text-purple-500 ml-1 cursor-pointer font-medium inline-block"
                >
                  Renvoyer le lien
                </motion.span>
              </motion.p>
            </motion.div>
          </motion.div>
        </Card>

        <motion.p
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-sm text-gray-500 mt-6"
        >
          Besoin d&apos;aide? <span className="text-purple-500 cursor-pointer hover:underline">Contacte-nous</span>
        </motion.p>
      </motion.div>
    </div>
  )
}
