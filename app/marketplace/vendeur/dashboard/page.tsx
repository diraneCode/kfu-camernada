"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatPrice } from "@/lib/utils"
import {
  BarChart3,
  Box,
  ChevronDown,
  CreditCard,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react"

// Sample data
const dashboardStats = [
  {
    title: "Ventes totales",
    value: "1,245.89 $",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Commandes",
    value: "42",
    change: "+8.2%",
    icon: ShoppingCart,
    trend: "up",
  },
  {
    title: "Produits",
    value: "15",
    change: "+2",
    icon: Package,
    trend: "up",
  },
  {
    title: "Clients",
    value: "38",
    change: "+5",
    icon: Users,
    trend: "up",
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Jean Dupont",
    date: "11 Avr 2024",
    status: "Livré",
    total: 79.99,
    items: 2,
  },
  {
    id: "ORD-002",
    customer: "Marie Lefebvre",
    date: "10 Avr 2024",
    status: "En cours",
    total: 149.99,
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Pierre Martin",
    date: "09 Avr 2024",
    status: "En attente",
    total: 24.99,
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Sophie Bernard",
    date: "08 Avr 2024",
    status: "Livré",
    total: 105.98,
    items: 3,
  },
  {
    id: "ORD-005",
    customer: "Thomas Dubois",
    date: "07 Avr 2024",
    status: "Livré",
    total: 59.99,
    items: 1,
  },
]

const products = [
  {
    id: "1",
    name: "Tissu Traditionnel",
    price: 79.99,
    stock: 15,
    sales: 24,
    image: "/placeholder.svg?height=100&width=100",
    status: "En stock",
  },
  {
    id: "2",
    name: "Épices Camerounaises",
    price: 24.99,
    stock: 25,
    sales: 18,
    image: "/placeholder.svg?height=100&width=100",
    status: "En stock",
  },
  {
    id: "3",
    name: "Art Traditionnel",
    price: 149.99,
    stock: 5,
    sales: 7,
    image: "/placeholder.svg?height=100&width=100",
    status: "Stock faible",
  },
  {
    id: "4",
    name: "Bijoux Artisanaux",
    price: 59.99,
    stock: 12,
    sales: 15,
    image: "/placeholder.svg?height=100&width=100",
    status: "En stock",
  },
  {
    id: "5",
    name: "Café Camerounais",
    price: 19.99,
    stock: 0,
    sales: 32,
    image: "/placeholder.svg?height=100&width=100",
    status: "Rupture de stock",
  },
]

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container py-32">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=100&width=100" alt="Seller Avatar" fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold">Artisanat Camerounais</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Vendeur Pro</p>
              </div>
            </div>

            <Separator className="my-4" />

            <nav className="space-y-1">
              <Button
                variant={activeTab === "dashboard" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "dashboard" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Tableau de bord
              </Button>
              <Button
                variant={activeTab === "orders" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "orders" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Commandes
              </Button>
              <Button
                variant={activeTab === "products" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "products" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={() => setActiveTab("products")}
              >
                <Package className="mr-2 h-4 w-4" />
                Produits
              </Button>
              <Button
                variant={activeTab === "customers" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "customers" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={() => setActiveTab("customers")}
              >
                <Users className="mr-2 h-4 w-4" />
                Clients
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "analytics" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={() => setActiveTab("analytics")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Analyses
              </Button>
              <Button
                variant={activeTab === "payments" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "payments" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={() => setActiveTab("payments")}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Paiements
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "settings" ? "bg-red-600 hover:bg-red-700 text-white" : ""
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </Button>
            </nav>

            <Separator className="my-4" />

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Forfait Pro</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Valide jusqu&apos;au 11 Mai 2024</p>
              <Button variant="outline" size="sm" className="w-full">
                Gérer l&apos;abonnement
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Tableau de bord</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Cette semaine <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Aujourd&apos;hui</DropdownMenuItem>
                    <DropdownMenuItem>Cette semaine</DropdownMenuItem>
                    <DropdownMenuItem>Ce mois</DropdownMenuItem>
                    <DropdownMenuItem>Cette année</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardStats.map((stat) => (
                  <Card key={stat.title}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                        </div>
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            stat.trend === "up"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                              : "bg-red-100 dark:bg-red-900/30 text-red-600"
                          }`}
                        >
                          <stat.icon className="h-6 w-6" />
                        </div>
                      </div>
                      <div className={`text-sm mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {stat.change} depuis le mois dernier
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Commandes récentes</CardTitle>
                    <CardDescription>Les 5 dernières commandes reçues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {order.customer} • {order.date}
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "Livré"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : order.status === "En cours"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}
                            >
                              {order.status}
                            </div>
                            <div className="mt-1 font-medium">{formatPrice(order.total)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("orders")}>
                      Voir toutes les commandes
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Produits populaires</CardTitle>
                    <CardDescription>Vos produits les plus vendus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {products
                        .sort((a, b) => b.sales - a.sales)
                        .slice(0, 5)
                        .map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{product.sales} ventes</div>
                            </div>
                            <div className="text-right font-medium">{formatPrice(product.price)}</div>
                          </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("products")}>
                      Gérer les produits
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold">Produits</h1>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Rechercher un produit..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="in-stock">En stock</TabsTrigger>
                  <TabsTrigger value="low-stock">Stock faible</TabsTrigger>
                  <TabsTrigger value="out-of-stock">Rupture</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Produit
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Prix
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Stock
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Ventes
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Statut
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/80">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-100">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{formatPrice(product.price)}</td>
                          <td className="px-4 py-3">{product.stock}</td>
                          <td className="px-4 py-3">{product.sales}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                product.status === "En stock"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : product.status === "Stock faible"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {product.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Voir</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Modifier</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  <span>Supprimer</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Commandes</h1>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Exporter
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="pending">En attente</TabsTrigger>
                  <TabsTrigger value="processing">En cours</TabsTrigger>
                  <TabsTrigger value="completed">Livrées</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Commande
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Client
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Statut
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                          Total
                        </th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/80">
                          <td className="px-4 py-3 font-medium">{order.id}</td>
                          <td className="px-4 py-3">{order.customer}</td>
                          <td className="px-4 py-3">{order.date}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "Livré"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : order.status === "En cours"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>Voir les détails</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Box className="mr-2 h-4 w-4" />
                                  <span>Mettre à jour le statut</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  <span>Facture</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Clients</h1>
              <p className="text-gray-600 dark:text-gray-400">Gérez vos clients et consultez leurs informations</p>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Analyses</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Consultez les statistiques et analyses de votre boutique
              </p>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Paiements</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Gérez vos méthodes de paiement et consultez vos revenus
              </p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Paramètres</h1>
              <p className="text-gray-600 dark:text-gray-400">Configurez les paramètres de votre boutique</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
