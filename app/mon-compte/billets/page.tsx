"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, MapPin, QrCode, Ticket } from "lucide-react"
import { formatPrice } from "@/lib/utils"

// Sample data
const tickets = [
  {
    id: "1",
    eventId: "1",
    eventName: "Soirée Culturelle Camerounaise",
    date: "15 Juin 2024",
    time: "19:00 - 23:00",
    location: "Centre Culturel, Montréal",
    image: "/placeholder.svg?height=400&width=600",
    ticketType: "VIP",
    price: 50,
    qrCode: "event:1,ticket:vip,quantity:1,date:2024-04-11T14:30:00.000Z,id:abc123",
    status: "upcoming",
  },
  {
    id: "2",
    eventId: "2",
    eventName: "Festival Gastronomique",
    date: "22 Juillet 2024",
    time: "12:00 - 20:00",
    location: "Parc Jean-Drapeau, Montréal",
    image: "/placeholder.svg?height=400&width=600",
    ticketType: "Standard",
    price: 15,
    qrCode: "event:2,ticket:standard,quantity:2,date:2024-04-10T09:15:00.000Z,id:def456",
    status: "upcoming",
  },
  {
    id: "3",
    eventId: "3",
    eventName: "Conférence Professionnelle",
    date: "10 Mars 2024",
    time: "09:00 - 17:00",
    location: "Hôtel Bonaventure, Montréal",
    image: "/placeholder.svg?height=400&width=600",
    ticketType: "Premium",
    price: 80,
    qrCode: "event:3,ticket:premium,quantity:1,date:2024-03-01T11:45:00.000Z,id:ghi789",
    status: "past",
  },
]

export default function TicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<(typeof tickets)[0] | null>(null)
  const [showQrDialog, setShowQrDialog] = useState(false)

  const upcomingTickets = tickets.filter((ticket) => ticket.status === "upcoming")
  const pastTickets = tickets.filter((ticket) => ticket.status === "past")

  const handleShowQr = (ticket: (typeof tickets)[0]) => {
    setSelectedTicket(ticket)
    setShowQrDialog(true)
  }

  return (
    <>
      <div className="container py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Mes Billets</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Gérez vos billets pour les événements à venir et passés
          </p>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upcoming">À venir</TabsTrigger>
              <TabsTrigger value="past">Passés</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              {upcomingTickets.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Ticket className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Aucun billet à venir</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Vous n&apos;avez pas encore acheté de billets pour des événements à venir.
                  </p>
                  <Link href="/evenements">
                    <Button className="bg-red-600 hover:bg-red-700">Découvrir les événements</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid gap-6">
                  {upcomingTickets.map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                          <Image
                            src={ticket.image || "/placeholder.svg"}
                            alt={ticket.eventName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{ticket.eventName}</h3>
                              <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>
                                    {ticket.date} • {ticket.time}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{ticket.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type de billet</div>
                              <div className="font-semibold">{ticket.ticketType}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-1">Prix</div>
                              <div className="font-semibold">{formatPrice(ticket.price)}</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-6">
                            <Button className="bg-red-600 hover:bg-red-700" onClick={() => handleShowQr(ticket)}>
                              <QrCode className="mr-2 h-4 w-4" />
                              Afficher le QR Code
                            </Button>
                            <Button variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="past">
              {pastTickets.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Aucun billet passé</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vous n&apos;avez pas de billets pour des événements passés.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {pastTickets.map((ticket) => (
                    <Card key={ticket.id} className="overflow-hidden opacity-75">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                          <Image
                            src={ticket.image || "/placeholder.svg"}
                            alt={ticket.eventName}
                            fill
                            className="object-cover grayscale"
                          />
                          <div className="absolute inset-0 bg-gray-900/30 flex items-center justify-center">
                            <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                              Événement passé
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{ticket.eventName}</h3>
                              <div className="space-y-1 text-gray-600 dark:text-gray-400">
                                <div className="flex items-center">
                                  <Calendar className="h-4 w-4 mr-2" />
                                  <span>
                                    {ticket.date} • {ticket.time}
                                  </span>
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2" />
                                  <span>{ticket.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Type de billet</div>
                              <div className="font-semibold">{ticket.ticketType}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 mb-1">Prix</div>
                              <div className="font-semibold">{formatPrice(ticket.price)}</div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-6">
                            <Button variant="outline">
                              <Download className="mr-2 h-4 w-4" />
                              Télécharger
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQrDialog} onOpenChange={setShowQrDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Code QR du billet</DialogTitle>
            <DialogDescription>Présentez ce code QR à l&apos;entrée de l&apos;événement</DialogDescription>
          </DialogHeader>
          {selectedTicket && (
            <div className="py-6">
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg mb-4">
                  <div className="relative w-64 h-64">
                    <Image src="/placeholder.svg?height=300&width=300" alt="QR Code" fill className="object-contain" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{selectedTicket.eventName}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{selectedTicket.ticketType}</p>
                <div className="w-full space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span>{selectedTicket.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Heure:</span>
                    <span>{selectedTicket.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lieu:</span>
                    <span>{selectedTicket.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ID du billet:</span>
                    <span>{selectedTicket.id}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
