"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Heart, LogOut, Settings, ShoppingBag, Ticket, UserCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

// Sample data
const userProfile = {
  id: "1",
  name: "Thomas Kamdem",
  email: "thomas.kamdem@example.com",
  phone: "+1 (514) 123-4567",
  address: "123 Rue Principale, Montréal, QC H2X 1Y6",
  image: "/placeholder.svg?height=300&width=300",
  memberSince: "Janvier 2022",
}

const userStats = [
  {
    title: "Commandes",
    value: "5",
    icon: ShoppingBag,
    href: "/mon-compte/commandes",
  },
  {
    title: "Billets",
    value: "3",
    icon: Ticket,
    href: "/mon-compte/billets",
  },
  {
    title: "Favoris",
    value: "12",
    icon: Heart,
    href: "/mon-compte/favoris",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    date: "11 Avr 2024",
    status: "Livré",
    total: 79.99,
    items: [
      {
        name: "Tissu Traditionnel",
        quantity: 1,
        price: 79.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "25 Mar 2024",
    status: "En cours",
    total: 45.98,
    items: [
      {
        name: "Épices Camerounaises",
        quantity: 1,
        price: 24.99,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "Café Camerounais",
        quantity: 1,
        price: 20.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Soirée Culturelle Camerounaise",
    date: "15 Juin 2024",
    location: "Centre Culturel, Montréal",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "2",
    title: "Festival Gastronomique",
    date: "22 Juillet 2024",
    location: "Parc Jean-Drapeau, Montréal",
    image: "/placeholder.svg?height=100&width=200",
  },
]

export const shaowDateFormat = (rawDate: string) => {

  // On transforme en objet Date
  const date = new Date(rawDate);

  // Formatter la date en français
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(date);

  return formattedDate
}
export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { profile, signOut } = useAuth();

  return (
    <div className="container py-32">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={profile?.avatar_url || "/placeholder.svg"}
                  alt={profile?.nom || "avatar"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{profile?.nom}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{profile?.telephone}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "profile" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                  }`}
                onClick={() => setActiveTab("profile")}
              >
                <UserCircle className="mr-2 h-4 w-4" />
                Profil
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "orders" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                  }`}
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Commandes
              </Button>
              <Button
                variant={activeTab === "tickets" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "tickets" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                  }`}
                onClick={() => setActiveTab("tickets")}
              >
                <Ticket className="mr-2 h-4 w-4" />
                Billets
              </Button>
              <Button
                variant={activeTab === "favorites" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "favorites" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                  }`}
                onClick={() => setActiveTab("favorites")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Favoris
              </Button>
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "dashboard" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                  }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Tableau de bord
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === "settings" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                  }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
              <Button
                onClick={signOut}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Mon Profil</h1>
                <Button variant="outline" onClick={() => setActiveTab("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                  <CardDescription>Vos informations de contact et votre profil</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto md:mx-0">
                      <Image
                        src={profile?.avatar_url || "/placeholder.svg"}
                        alt={profile?.nom || "avatar"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Nom complet</h3>
                          <p className="mt-1">{profile?.nom}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                          <p className="mt-1">{profile?.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</h3>
                          <p className="mt-1">{profile?.telephone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Adresse</h3>
                          <p className="mt-1">{profile?.ville}, {profile?.pays}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Membre depuis</h3>
                          <p className="mt-1">{profile?.created_at && shaowDateFormat(profile?.created_at)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userStats.map((stat) => (
                  <Card key={stat.title} className="hover:shadow-md transition-shadow">
                    <Link href={stat.href}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                            <stat.icon className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dernières commandes</CardTitle>
                    <CardDescription>Vos commandes récentes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.length === 0 ? (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                          Vous n&apos;avez pas encore passé de commande
                        </p>
                      ) : (
                        recentOrders.map((order) => (
                          <Link key={order.id} href={`/mon-compte/commandes/${order.id}`}>
                            <div className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <div className="relative w-16 h-16 rounded-md overflow-hidden">
                                <Image
                                  src={order.items[0].image || "/placeholder.svg"}
                                  alt={order.items[0].name}
                                  fill
                                  className="object-cover"
                                />
                                {order.items.length > 1 && (
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm font-medium">
                                    +{order.items.length - 1}
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{order.id}</h4>
                                  <span
                                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${order.status === "Livré"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                      : order.status === "En cours"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                      }`}
                                  >
                                    {order.status}
                                  </span>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{order.date}</span>
                                  <span className="font-medium">{order.total} $</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("orders")}>
                      Voir toutes les commandes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Événements à venir</CardTitle>
                    <CardDescription>Les événements auxquels vous êtes inscrit</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.length === 0 ? (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                          Vous n&apos;êtes inscrit à aucun événement à venir
                        </p>
                      ) : (
                        upcomingEvents.map((event) => (
                          <Link key={event.id} href={`/evenements/${event.id}`}>
                            <div className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <div className="relative w-24 h-16 rounded-md overflow-hidden">
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{event.title}</h4>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.date}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{event.location}</div>
                              </div>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("tickets")}>
                      Voir tous les billets
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Bienvenue sur votre tableau de bord. Vous pouvez consulter vos statistiques et activités récentes ici.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userStats.map((stat) => (
                  <Card key={stat.title} className="hover:shadow-md transition-shadow">
                    <Link href={stat.href}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                          </div>
                          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600">
                            <stat.icon className="h-6 w-6" />
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Activités récentes</CardTitle>
                  <CardDescription>Vos dernières activités sur la plateforme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                          <Ticket className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Achat de billet</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Vous avez acheté un billet pour l&apos;événement &quot;Soirée Culturelle Camerounaise&quot;
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Il y a 2 jours</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Commande effectuée</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Votre commande #ORD-001 a été livrée avec succès
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Il y a 5 jours</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Produit ajouté aux favoris</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Vous avez ajouté &quot;Tissu Traditionnel&quot; à vos favoris
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Il y a 1 semaine</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Mes Commandes</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Consultez l&apos;historique de vos commandes et leur statut
              </p>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="pending">En cours</TabsTrigger>
                  <TabsTrigger value="completed">Livrées</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                          <div className="flex justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{order.id}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Commandé le {order.date}</p>
                            </div>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${order.status === "Livré"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : order.status === "En cours"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                }`}
                            >
                              {order.status}
                            </span>
                          </div>

                          <div className="space-y-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex gap-4">
                                <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <div className="flex justify-between mt-1">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                      Qté: {item.quantity}
                                    </span>
                                    <span className="font-medium">{item.price} $</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="md:w-64 md:border-l md:border-gray-200 md:dark:border-gray-700 md:pl-6">
                          <h4 className="font-medium mb-3">Résumé</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Sous-total</span>
                              <span>{order.total} $</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600 dark:text-gray-400">Taxes</span>
                              <span>{(order.total * 0.15).toFixed(2)} $</span>
                            </div>
                            <div className="flex justify-between font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                              <span>Total</span>
                              <span>{(order.total * 1.15).toFixed(2)} $</span>
                            </div>
                          </div>

                          <div className="mt-6 space-y-2">
                            <Button className="w-full bg-red-600 hover:bg-red-700">Voir les détails</Button>
                            {order.status !== "Livré" && (
                              <Button variant="outline" className="w-full">
                                Suivre la commande
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "tickets" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Mes Billets</h1>
                <Link href="/evenements">
                  <Button className="bg-red-600 hover:bg-red-700">Explorer les événements</Button>
                </Link>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                Consultez vos billets pour les événements à venir et passés
              </p>

              <Tabs defaultValue="upcoming">
                <TabsList>
                  <TabsTrigger value="upcoming">À venir</TabsTrigger>
                  <TabsTrigger value="past">Passés</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <Link key={event.id} href={`/mon-compte/billets`}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative w-32 h-20 rounded-md overflow-hidden">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{event.title}</h3>
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.date}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{event.location}</div>
                          </div>
                          <div className="flex items-center">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              Voir le billet
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Mes Favoris</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Consultez les produits et événements que vous avez ajoutés à vos favoris
              </p>

              <Tabs defaultValue="products">
                <TabsList>
                  <TabsTrigger value="products">Produits</TabsTrigger>
                  <TabsTrigger value="events">Événements</TabsTrigger>
                </TabsList>

                <TabsContent value="products" className="mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Card key={i} className="overflow-hidden group">
                        <div className="relative aspect-square">
                          <Image
                            src={`/placeholder.svg?height=300&width=300`}
                            alt={`Produit Favori ${i}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium">Produit Favori {i}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <span className="font-semibold">{(i * 20 + 9.99).toFixed(2)} $</span>
                            <Button size="sm" variant="outline">
                              <ShoppingBag className="h-4 w-4 mr-2" />
                              Ajouter
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="overflow-hidden group">
                        <div className="relative h-48">
                          <Image
                            src={`/placeholder.svg?height=300&width=600`}
                            alt={`Événement Favori ${i}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                          <div className="absolute bottom-0 left-0 bg-red-600 text-white px-4 py-2 font-medium">
                            {(i * 10 + 15).toFixed(2)} $
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg">Événement Favori {i}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(2024, 5 + i, 10 + i * 5).toLocaleDateString("fr-CA", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Lieu {i}, Montréal</p>
                          <div className="mt-4">
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                              <Ticket className="h-4 w-4 mr-2" />
                              Acheter un billet
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Paramètres</h1>
              <p className="text-gray-600 dark:text-gray-400">Gérez vos informations personnelles et vos préférences</p>

              <Tabs defaultValue="profile">
                <TabsList>
                  <TabsTrigger value="profile">Profil</TabsTrigger>
                  <TabsTrigger value="password">Mot de passe</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Nom complet
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            defaultValue={profile?.nom}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            defaultValue={profile?.email}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium">
                            Téléphone
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            defaultValue={profile?.telephone}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="address" className="text-sm font-medium">
                            Adresse
                          </label>
                          <input
                            id="address"
                            type="text"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            defaultValue={profile?.pays}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button className="bg-red-600 hover:bg-red-700">Enregistrer les modifications</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Photo de profil</CardTitle>
                      <CardDescription>Mettez à jour votre photo de profil</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden">
                          <Image
                            src={userProfile.image || "/placeholder.svg"}
                            alt={userProfile.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row gap-4">
                            <Button variant="outline">Télécharger une photo</Button>
                            <Button
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                            >
                              Supprimer
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Formats acceptés: JPG, PNG. Taille maximale: 2 Mo
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="password" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Changer le mot de passe</CardTitle>
                      <CardDescription>Mettez à jour votre mot de passe pour sécuriser votre compte</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="current-password" className="text-sm font-medium">
                            Mot de passe actuel
                          </label>
                          <input
                            id="current-password"
                            type="password"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="new-password" className="text-sm font-medium">
                            Nouveau mot de passe
                          </label>
                          <input
                            id="new-password"
                            type="password"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="confirm-password" className="text-sm font-medium">
                            Confirmer le nouveau mot de passe
                          </label>
                          <input
                            id="confirm-password"
                            type="password"
                            className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button className="bg-red-600 hover:bg-red-700">Mettre à jour le mot de passe</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Préférences de notification</CardTitle>
                      <CardDescription>Gérez comment et quand vous recevez des notifications</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Notifications par email</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Recevez des emails concernant vos activités et commandes
                            </p>
                          </div>
                          <div className="h-6 w-11 bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full transform transition-transform translate-x-5"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Notifications d&apos;événements</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Recevez des notifications concernant les nouveaux événements
                            </p>
                          </div>
                          <div className="h-6 w-11 bg-red-600 rounded-full p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Notifications de promotions</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Recevez des notifications concernant les promotions et offres spéciales
                            </p>
                          </div>
                          <div className="h-6 w-11 bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Notifications de la communauté</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Recevez des notifications concernant les activités de la communauté
                            </p>
                          </div>
                          <div className="h-6 w-11 bg-red-600 rounded-full p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full transform transition-transform translate-x-5"></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Confidentialité</CardTitle>
                      <CardDescription>Gérez vos paramètres de confidentialité</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Profil public</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Permettre aux autres membres de voir votre profil
                            </p>
                          </div>
                          <div className="h-6 w-11 bg-red-600 rounded-full p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full transform transition-transform translate-x-5"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Historique des activités</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Enregistrer l&apos;historique de vos activités sur la plateforme
                            </p>
                          </div>
                          <div className="h-6 w-11 bg-red-600 rounded-full p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full transform transition-transform translate-x-5"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Cookies de personnalisation</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Personnaliser votre expérience en fonction de votre historique de navigation
                            </p>
                          </div>
                          <div className="h-6 w-11 bg-gray-200 dark:bg-gray-700 rounded-full p-1 cursor-pointer">
                            <div className="h-4 w-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium mb-4">Actions concernant votre compte</h4>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20"
                          >
                            Exporter mes données
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                          >
                            Supprimer mon compte
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
