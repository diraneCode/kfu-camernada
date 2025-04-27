"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    id: 1,
    name: "Marie Nguemo",
    role: "Étudiante à l'Université de Montréal",
    avatar: "/placeholder.svg?height=100&width=100&text=MN",
    quote:
      "Grâce à Solidarité CamerNada, j'ai pu trouver un logement et me faire des amis dès mon arrivée à Montréal. La communauté m'a vraiment aidée à m'intégrer rapidement.",
  },
  {
    id: 2,
    name: "Jean-Paul Mbarga",
    role: "Entrepreneur",
    avatar: "/placeholder.svg?height=100&width=100&text=JPM",
    quote:
      "Les événements de networking m'ont permis de développer mon réseau professionnel et de trouver des partenaires pour mon entreprise. Une vraie mine d'or pour les entrepreneurs camerounais!",
  },
  {
    id: 3,
    name: "Sophie Kamdem",
    role: "Nouvelle arrivante",
    avatar: "/placeholder.svg?height=100&width=100&text=SK",
    quote:
      "Les conseils et l'entraide sur le forum m'ont été précieux pour comprendre les démarches administratives. Je me suis sentie soutenue dès mon arrivée au Canada.",
  },
  {
    id: 4,
    name: "Thomas Etoa",
    role: "Ingénieur informatique",
    avatar: "/placeholder.svg?height=100&width=100&text=TE",
    quote:
      "J'ai trouvé mon emploi actuel grâce aux offres publiées sur la plateforme. Le réseau professionnel de Solidarité CamerNada est vraiment efficace!",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleNext = () => {
    setIsAutoPlaying(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  const handlePrev = () => {
    setIsAutoPlaying(false)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setActiveIndex(index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block">
            Témoignages
            <motion.span
              className="absolute -bottom-2 left-0 w-0 h-1 bg-red-600"
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Découvrez ce que nos membres disent de leur expérience avec Solidarité CamerNada.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            className="absolute -top-10 -left-10 text-red-600 opacity-20"
            initial={{ rotate: 0 }}
            animate={{ rotate: 10 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          >
            <Quote size={100} />
          </motion.div>

          <motion.div
            className="absolute -bottom-10 -right-10 text-red-600 opacity-20"
            initial={{ rotate: 0 }}
            animate={{ rotate: -10 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
          >
            <Quote size={100} />
          </motion.div>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white"
              >
                <Card className="border-none rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/3 bg-gradient-to-br from-red-500 to-red-700 p-8 flex items-center justify-center">
                        <motion.div
                          className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg"
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                            alt={testimonials[activeIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      </div>
                      <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                        >
                          <p className="text-xl md:text-2xl italic mb-8 leading-relaxed text-gray-700">
                            "{testimonials[activeIndex].quote}"
                          </p>
                          <div>
                            <h4 className="font-bold text-xl text-red-600">{testimonials[activeIndex].name}</h4>
                            <p className="text-gray-500">{testimonials[activeIndex].role}</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Témoignage précédent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-10"
              aria-label="Témoignage suivant"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-red-600 w-8" : "bg-gray-300 hover:bg-red-300"
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
