"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { formatPrice, generateId } from "@/lib/utils"
import { Calendar, Clock, Heart, MapPin, Share2, Ticket, Users } from "lucide-react"

// Sample data
const events = [
  {
    id: "1",
    title: "Soirée Culturelle Camerounaise",
    description:
      "Une soirée dédiée à la célébration de la culture camerounaise avec de la musique, de la danse et de la gastronomie traditionnelle. Venez découvrir la richesse culturelle du Cameroun à travers des performances artistiques, des expositions et des dégustations culinaires. Un événement convivial pour toute la famille qui vous permettra de vous immerger dans l'ambiance chaleureuse et festive du Cameroun.",
    date: "15 Juin 2024",
    time: "19:00 - 23:00",
    location: "Centre Culturel, Montréal",
    address: "123 Rue Principale, Montréal, QC H2X 1Y6",
    image: "/billet1.jpg?height=600&width=1200",
    gallery: [
      "/billet1.jpg?height=400&width=600",
      "/billet1.jpg?height=400&width=600",
      "/billet1.jpg?height=400&width=600",
    ],
    price: 25,
    category: "Culture",
    organizer: "Association Camerounaise de Montréal",
    ticketTypes: [
      { id: "standard", name: "Standard", price: 25 },
      { id: "vip", name: "VIP", price: 50 },
      { id: "family", name: "Famille (4 personnes)", price: 80 },
    ],
  },
  {
    id: "2",
    title: "Festival Gastronomique",
    description:
      "Découvrez les saveurs authentiques de la cuisine camerounaise lors de ce festival gastronomique. Dégustations et ateliers culinaires au programme. Venez explorer la diversité culinaire du Cameroun à travers des stands de dégustation, des démonstrations de cuisine et des ateliers interactifs. Une occasion unique de découvrir des plats traditionnels préparés par des chefs camerounais talentueux.",
    date: "22 Juillet 2024",
    time: "12:00 - 20:00",
    location: "Parc Jean-Drapeau, Montréal",
    address: "1 Circuit Gilles Villeneuve, Montréal, QC H3C 1A9",
    image: "/billet2.jpg?height=600&width=1200",
    gallery: [
      "/billet2.jpg?height=400&width=600",
      "/billet2.jpg?height=400&width=600",
      "/billet2.jpg?height=400&width=600",
    ],
    price: 15,
    category: "Gastronomie",
    organizer: "Club Culinaire Camerounais",
    ticketTypes: [
      { id: "standard", name: "Standard", price: 15 },
      { id: "premium", name: "Premium", price: 30 },
      { id: "family", name: "Famille (4 personnes)", price: 50 },
    ],
  },
  {
    id: "3",
    title: "Conférence Professionnelle",
    description:
      "Une conférence dédiée aux professionnels camerounais au Canada. Réseautage et opportunités professionnelles. Participez à des panels de discussion, des ateliers de développement professionnel et des sessions de réseautage avec des entrepreneurs et professionnels camerounais établis au Canada. Une opportunité unique pour développer votre réseau professionnel et explorer de nouvelles opportunités de carrière.",
    date: "10 Août 2024",
    time: "09:00 - 17:00",
    location: "Hôtel Bonaventure, Montréal",
    address: "900 Rue de la Gauchetière O, Montréal, QC H5A 1E4",
    image: "/event-3.jpeg?height=600&width=1200",
    gallery: [
      "/event-1.jpeg?height=400&width=600",
      "/event-2.jpg?height=400&width=600",
      "/event-3.jpeg?height=400&width=600",
    ],
    price: 50,
    category: "Professionnel",
    organizer: "Réseau Professionnel Camerounais",
    ticketTypes: [
      { id: "standard", name: "Standard", price: 50 },
      { id: "premium", name: "Premium", price: 80 },
      { id: "student", name: "Étudiant", price: 25 },
    ],
  },
]

export default function EventPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const [ticketType, setTicketType] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [showTicketDialog, setShowTicketDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [qrCode, setQrCode] = useState("")

  const event = events.find((e) => e.id === params.id)

  if (!event) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Événement non trouvé</h1>
        <p className="mb-8">L&apos;événement que vous recherchez n&apos;existe pas.</p>
        <Button onClick={() => router.push("/evenements")} className="bg-red-600 hover:bg-red-700">
          Retour aux événements
        </Button>
      </div>
    )
  }

  const selectedTicket = event.ticketTypes.find((t) => t.id === ticketType)

  const handleBuyTicket = () => {
    if (!ticketType) {
      toast({
        title: "Sélection requise",
        description: "Veuillez sélectionner un type de billet",
        variant: "destructive",
      })
      return
    }

    // Generate QR code data
    const qrData = `event:${event.id},ticket:${ticketType},quantity:${quantity},date:${new Date().toISOString()},id:${generateId()}`
    setQrCode(qrData)

    // Add to cart
    if (selectedTicket) {
      addItem({
        id: `${event.id}-${ticketType}-${generateId()}`,
        name: event.title,
        price: selectedTicket.price,
        quantity: Number.parseInt(quantity),
        image: event.image,
        type: selectedTicket.name,
      })
    }

    setShowTicketDialog(false)
    setShowSuccessDialog(true)
  }

  return (
    <>
      <div className="container py-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6">
              <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" priority />
            </div>

            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {event.gallery.map((img, index) => (
                <div key={index} className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${event.title} - image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
                <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-red-600" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-red-600" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-red-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{event.description}</p>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-4">Lieu</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{event.address}</p>
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image src="/placeholder.svg?height=300&width=600" alt="Map" fill className="object-cover" />
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-4">Organisateur</h2>
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="/placeholder.svg?height=100&width=100"
                      alt={event.organizer}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{event.organizer}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Organisateur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Billets</CardTitle>
                <CardDescription>Sélectionnez vos billets pour cet événement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {event.ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex justify-between items-center p-4 border rounded-lg hover:border-red-600 cursor-pointer transition-colors"
                      onClick={() => setTicketType(ticket.id)}
                    >
                      <div>
                        <h3 className="font-medium">{ticket.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(ticket.price)}</p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 ${
                          ticketType === ticket.id ? "border-red-600 bg-red-600" : "border-gray-300"
                        }`}
                      ></div>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                  onClick={() => setShowTicketDialog(true)}
                >
                  <Ticket className="mr-2 h-5 w-5" />
                  Acheter des billets
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Ajouté aux favoris",
                        description: "Cet événement a été ajouté à vos favoris",
                      })
                    }}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Favoris
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      toast({
                        title: "Lien copié",
                        description: "Le lien de l'événement a été copié dans le presse-papier",
                      })
                    }}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Partager
                  </Button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Informations</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Users className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <span>Capacité limitée, réservez tôt</span>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                      <span>Annulation gratuite jusqu&apos;à 7 jours avant l&apos;événement</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Ticket Selection Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sélection des billets</DialogTitle>
            <DialogDescription>Choisissez le type et la quantité de billets</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="ticket-type" className="text-sm font-medium">
                Type de billet
              </label>
              <Select value={ticketType} onValueChange={setTicketType}>
                <SelectTrigger id="ticket-type">
                  <SelectValue placeholder="Sélectionnez un type de billet" />
                </SelectTrigger>
                <SelectContent>
                  {event.ticketTypes.map((ticket) => (
                    <SelectItem key={ticket.id} value={ticket.id}>
                      {ticket.name} - {formatPrice(ticket.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantité
              </label>
              <Select value={quantity} onValueChange={setQuantity}>
                <SelectTrigger id="quantity">
                  <SelectValue placeholder="Sélectionnez une quantité" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {ticketType && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-2">
                <div className="flex justify-between mb-2">
                  <span>Prix unitaire:</span>
                  <span>{formatPrice(event.ticketTypes.find((t) => t.id === ticketType)?.price || 0)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Quantité:</span>
                  <span>{quantity}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>
                    {formatPrice(
                      (event.ticketTypes.find((t) => t.id === ticketType)?.price || 0) * Number.parseInt(quantity),
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTicketDialog(false)}>
              Annuler
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleBuyTicket}>
              Ajouter au panier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Billets ajoutés au panier!</DialogTitle>
            <DialogDescription>Vos billets ont été ajoutés au panier avec succès.</DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                <Ticket className="h-16 w-16 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                {selectedTicket?.name} x {quantity}
              </p>
            </motion.div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => {
                setShowSuccessDialog(false)
                router.push("/evenements")
              }}
            >
              Continuer mes achats
            </Button>
            <Button
              className="sm:flex-1 bg-red-600 hover:bg-red-700"
              onClick={() => {
                setShowSuccessDialog(false)
                router.push("/checkout")
              }}
            >
              Passer à la caisse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
