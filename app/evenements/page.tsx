"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { useEvent } from "@/hooks/useEvent"

// Sample data
// const events = [
//   {
//     id: "1",
//     title: "Soirée Culturelle Camerounaise",
//     description:
//       "Une soirée dédiée à la célébration de la culture camerounaise avec de la musique, de la danse et de la gastronomie traditionnelle.",
//     date: "15 Juin 2024",
//     time: "19:00 - 23:00",
//     location: "Centre Culturel, Montréal",
//     image: "/billet1.jpg?height=400&width=600",
//     price: 25,
//     category: "Culture",
//   },
//   {
//     id: "2",
//     title: "Festival Gastronomique",
//     description:
//       "Découvrez les saveurs authentiques de la cuisine camerounaise lors de ce festival gastronomique. Dégustations et ateliers culinaires au programme.",
//     date: "22 Juillet 2024",
//     time: "12:00 - 20:00",
//     location: "Parc Jean-Drapeau, Montréal",
//     image: "/billet2.jpg?height=400&width=600",
//     price: 15,
//     category: "Gastronomie",
//   },
//   {
//     id: "3",
//     title: "Conférence Professionnelle",
//     description:
//       "Une conférence dédiée aux professionnels camerounais au Canada. Réseautage et opportunités professionnelles.",
//     date: "10 Août 2024",
//     time: "09:00 - 17:00",
//     location: "Hôtel Bonaventure, Montréal",
//     image: "/event-3.jpeg?height=400&width=600",
//     price: 50,
//     category: "Professionnel",
//   },
//   {
//     id: "4",
//     title: "Match de Football Amical",
//     description: "Venez supporter l'équipe camerounaise lors de ce match amical contre l'équipe locale.",
//     date: "5 Septembre 2024",
//     time: "15:00 - 17:00",
//     location: "Stade Saputo, Montréal",
//     image: "/event-2.jpg?height=400&width=600",
//     price: 20,
//     category: "Sport",
//   },
//   {
//     id: "5",
//     title: "Exposition d'Art Camerounais",
//     description: "Une exposition mettant en valeur les œuvres d'artistes camerounais contemporains.",
//     date: "18 Septembre 2024",
//     time: "10:00 - 18:00",
//     location: "Galerie d'Art, Québec",
//     image: "/event-1.jpeg?height=400&width=600",
//     price: 10,
//     category: "Art",
//   },
//   {
//     id: "6",
//     title: "Atelier de Danse Traditionnelle",
//     description: "Apprenez les danses traditionnelles camerounaises lors de cet atelier interactif.",
//     date: "2 Octobre 2024",
//     time: "14:00 - 16:00",
//     location: "Studio de Danse, Ottawa",
//     image: "/event-3.jpeg?height=400&width=600",
//     price: 15,
//     category: "Culture",
//   },
// ]

// Petit composant vide sympa
function EmptyState() {
  return (
    <div className="text-center py-20">
      <h3 className="text-2xl font-bold mb-2">Aucun événement trouvé</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Essayez d'élargir vos critères de recherche ou revenez plus tard.
      </p>
      <Link
        href="/"
        className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
      >
        Retour à l'accueil
      </Link>
    </div>
  )
}

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { data: eventList } = useEvent()

  const filteredEvents = eventList?.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || event.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...new Set(eventList?.map((event) => event.category))]

  return (
    <div className="container py-32">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Événements</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Découvrez et participez à nos événements culturels, sociaux et professionnels
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher un événement..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "Toutes les catégories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredEvents?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents?.map((event) => (
            <Link
              key={event.id}
              href={`/evenements/${event.id}`} // <-- ici j'ai corrigé : tu avais oublié les backticks
              className="group"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-medium">
                    {event.category}
                  </div>
                  <div className="absolute bottom-0 left-0 bg-red-600 text-white px-4 py-2 font-medium">
                    {formatPrice(event.price)}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                  <div className="mt-auto space-y-2">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>
                        {event.date.toString()} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
