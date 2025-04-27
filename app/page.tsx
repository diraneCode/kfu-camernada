"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Calendar, ChevronRight, MapPin, Music, ShoppingBag, Star, Users } from "lucide-react"
import Testimonials from "@/components/testimonials"
import { useAuth } from "@/contexts/AuthContext"
import { useEvent } from "@/hooks/useEvent"

// Sample data
const upcomingEvents = [
  {
    id: "1",
    title: "Soirée Culturelle Camerounaise",
    date: "15 Juin 2024",
    location: "Centre Culturel, Montréal",
    image: "/billet1.jpg?height=400&width=600",
    price: 25,
  },
  {
    id: "2",
    title: "Festival Gastronomique",
    date: "22 Juillet 2024",
    location: "Parc Jean-Drapeau, Montréal",
    image: "/billet2.jpg?height=400&width=600",
    price: 15,
  },
  {
    id: "3",
    title: "Conférence Professionnelle",
    date: "10 Août 2024",
    location: "Hôtel Bonaventure, Montréal",
    image: "/event-3.jpeg?height=400&width=600",
    price: 50,
  },
]

const featuredProducts = [
  {
    id: "1",
    name: "Tissu Traditionnel",
    price: 79.99,
    image: "/tissu.jpeg?height=300&width=300",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Épices Camerounaises",
    price: 24.99,
    image: "/epice.jpeg?height=300&width=300",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Art Traditionnel",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Manioc",
    price: 59.99,
    image: "/manioc.jpeg?height=300&width=300",
    rating: 4.7,
  },
]

export default function Home() {
  const { profile } = useAuth();
  const animatedElements = useRef<HTMLElement[]>([])
  const { data: eventList } = useEvent();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll(".animate-on-scroll")
    elements.forEach((el) => {
      observer.observe(el)
      animatedElements.current.push(el as HTMLElement)
    })

    return () => {
      animatedElements.current.forEach((el) => {
        observer.unobserve(el)
      })
    }
  }, [])

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 md:pt-40 overflow-hidden">
        <div className="container mx-auto px-4 relative">
          {/* Decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-red-100 rounded-full"></div>
          <div className="absolute top-1/4 right-1/4 w-80 h-80 border border-red-50 rounded-full"></div>
          <div className="absolute -top-10 -left-20 w-40 h-40 border border-red-200 rounded-full"></div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-red-50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-red-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-sm font-medium text-red-700">Événements Cameroun-Canada 2025</span>
              </div>

              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                <span className="block">Vibrez au rythme</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
                  des nuits afro-canadiennes
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-md">
                Découvrez les soirées les plus électriques qui fusionnent les cultures camerounaises et canadiennes.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={"/evenements"}>
                  <Button className="bg-gradient-to-r from-red-400 to-red-500 text-white rounded-full px-8 py-6 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 hover:from-red-500 hover:to-red-400 group">
                    <span>découvrir les événements</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={`/billet2.jpg?height=32&width=32`}
                        width={32}
                        height={32}
                        alt={`Person ${i}`}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  <span className="text-gray-900 font-medium">+2500</span> personnes inscrites
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Main image with glow effect */}
              <div className="relative z-10 rounded-2xl overflow-hidden border border-red-100 shadow-[0_0_25px_rgba(239,68,68,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-t from-red-500/30 via-transparent to-transparent z-10"></div>
                <Image
                  src="/billet2.jpg?height=600&width=800"
                  width={800}
                  height={600}
                  alt="Soirée Afro-Canadienne"
                  className="object-cover w-full aspect-[4/3]"
                  priority
                />

                {/* Floating event card */}
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/80 border border-red-100 rounded-xl p-4 z-20">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Afro Fusion Night</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Calendar className="mr-1 h-4 w-4 text-red-400" />
                        <span>25 Mai 2025</span>
                        <MapPin className="ml-3 mr-1 h-4 w-4 text-red-400" />
                        <span>Montréal</span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-400 rounded-full h-8 px-3 text-white">
                      Réserver
                    </Button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-red-200 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border border-red-100 rounded-full"></div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="backdrop-blur-md bg-white/80 border border-red-100 rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center mr-4">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">25+</div>
                  <p className="text-sm text-gray-500">Événements à venir</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/80 border border-red-100 rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">2 Pays</div>
                  <p className="text-sm text-gray-500">Cameroun & Canada</p>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-white/80 border border-red-100 rounded-xl p-6 transform transition-transform hover:scale-105 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5000+</div>
                  <p className="text-sm text-gray-500">Membres de la communauté</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 animate-on-scroll">Événements à venir</h2>
              <p className="text-gray-600 dark:text-gray-400 animate-on-scroll">
                Découvrez et participez à nos prochains événements
              </p>
            </div>
            <Link
              href="/evenements"
              className="text-red-600 hover:text-red-700 flex items-center font-medium animate-on-scroll"
            >
              Voir tous les événements
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {eventList?.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Aucun événement à venir</h3>
              <p className="text-gray-500 dark:text-gray-400">Revenez plus tard pour découvrir de nouveaux événements</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventList?.map((event, index) => (
                <Link key={event.id} href={`/evenements/${event.id}`} className="group">
                  <div
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow animate-on-scroll"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 bg-red-600 text-white px-4 py-2 font-medium">
                        {event.price} $
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-gray-500 dark:text-gray-400 mb-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{event.date.toString()}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>


      {/* Marketplace Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 animate-on-scroll">Marketplace</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-on-scroll">
              Découvrez des produits authentiques camerounais et africains
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <Link key={product.id} href={`/marketplace/${product.id}`} className="group">
                <div
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium group-hover:text-red-600 transition-colors">{product.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-semibold">{product.price} $</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/marketplace">
              <Button className="bg-red-600 hover:bg-red-700">
                Explorer la marketplace
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section */}
      {!profile && <section className="py-20 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 animate-on-scroll">Rejoignez notre communauté</h2>
              <p className="text-xl mb-8 animate-on-scroll">
                Faites partie d&apos;un réseau dynamique de Camerounais au Canada. Partagez vos expériences, trouvez du
                soutien et célébrez ensemble notre riche culture.
              </p>
              <div className="space-y-4 animate-on-scroll">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Réseau professionnel</h3>
                    <p className="text-white/80">Connectez-vous avec d&apos;autres professionnels camerounais</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Événements exclusifs</h3>
                    <p className="text-white/80">Accédez à des événements réservés aux membres</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Avantages commerciaux</h3>
                    <p className="text-white/80">Bénéficiez de réductions sur la marketplace</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 animate-on-scroll">
                <Link href="/inscription">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-white/90">
                    Devenir membre
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <div className="relative h-[500px] rounded-xl overflow-hidden">
                <Image
                  src="/kamer.jpg?height=500&width=400"
                  alt="Communauté Camerounaise"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-red-500 rounded-xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-red-700 rounded-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>}

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      {!profile && <section className="py-16 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 street-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6 neon-text">Rejoignez notre communauté</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Créez votre compte pour participer aux événements, rencontrer d'autres membres et rester informé des
            actualités de la communauté.
          </p>
          <Link href="/inscription">
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold street-shadow hover:scale-105 transition-transform"
            >
              S'inscrire maintenant
            </Button>
          </Link>
        </div>
      </section>}
    </>
  )
}
