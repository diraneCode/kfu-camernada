"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, ShoppingBag, Star } from "lucide-react"
import { formatPrice } from "@/lib/utils"

// Sample data
const products = [
  {
    id: "1",
    name: "Tissu Traditionnel",
    description: "Tissu traditionnel camerounais aux motifs colorés",
    price: 79.99,
    image: "/tissu.jpeg?height=300&width=300",
    category: "Vêtements",
    rating: 4.8,
    seller: "Artisanat Camerounais",
  },
  {
    id: "2",
    name: "Épices Camerounaises",
    description: "Assortiment d'épices authentiques du Cameroun",
    price: 24.99,
    image: "/epice.jpeg?height=300&width=300",
    category: "Alimentation",
    rating: 4.5,
    seller: "Saveurs d'Afrique",
  },
  {
    id: "3",
    name: "Manioc",
    description: "Baton de manioc fait grâce aux tubercules",
    price: 149.99,
    image: "/manioc.jpeg?height=300&width=300",
    category: "Aliment",
    rating: 4.9,
    seller: "Galerie Africaine",
  },
  {
    id: "4",
    name: "Bijoux Artisanaux",
    description: "Bijoux faits à la main avec des matériaux traditionnels",
    price: 59.99,
    image: "/bijoux.jpeg?height=300&width=300",
    category: "Accessoires",
    rating: 4.7,
    seller: "Créations Camerounaises",
  },
  {
    id: "5",
    name: "Café Camerounais",
    description: "Café de qualité supérieure cultivé dans les montagnes du Cameroun",
    price: 19.99,
    image: "/cafe.jpeg?height=300&width=300",
    category: "Alimentation",
    rating: 4.6,
    seller: "Saveurs d'Afrique",
  },
  {
    id: "6",
    name: "Panier Tressé",
    description: "Panier tressé à la main par des artisans camerounais",
    price: 45.99,
    image: "/panier.jpeg?height=300&width=300",
    category: "Maison",
    rating: 4.4,
    seller: "Artisanat Camerounais",
  },
  {
    id: "7",
    name: "Huile de Palme",
    description: "Huile de palme traditionnelle du Cameroun",
    price: 12.99,
    image: "/huile.jpeg?height=300&width=300",
    category: "Alimentation",
    rating: 4.3,
    seller: "Saveurs d'Afrique",
  },
  {
    id: "8",
    name: "Masque Décoratif",
    description: "Masque décoratif traditionnel camerounais",
    price: 89.99,
    image: "/masque.jpeg?height=300&width=300",
    category: "Art",
    rating: 4.8,
    seller: "Galerie Africaine",
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [sortBy, setSortBy] = useState("featured")

  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))]

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "rating") return b.rating - a.rating
      return 0 // featured
    })

  return (
    <div className="container py-32">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Découvrez des produits authentiques camerounais et africains
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Filtres</h2>
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Catégorie</label>
                <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les catégories" />
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

              <div>
                <label className="text-sm font-medium mb-2 block">Prix</label>
                <div className="pt-4 px-2">
                  <Slider defaultValue={[0, 200]} max={200} step={1} value={priceRange} onValueChange={setPriceRange} />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{formatPrice(priceRange[0])}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{formatPrice(priceRange[1])}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Trier</label>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">En vedette</SelectItem>
                    <SelectItem value="price-asc">Prix: croissant</SelectItem>
                    <SelectItem value="price-desc">Prix: décroissant</SelectItem>
                    <SelectItem value="rating">Évaluation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Devenir vendeur</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Vous souhaitez vendre vos produits sur notre marketplace?
            </p>
            <Link href="/marketplace/devenir-vendeur">
              <Button className="w-full bg-red-600 hover:bg-red-700">Commencer à vendre</Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
              <p className="text-gray-600 dark:text-gray-400">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/marketplace/${product.id}`} className="group">
                  <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                    <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-medium group-hover:text-red-600 transition-colors">{product.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2 line-clamp-2 flex-1">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-auto">
                        <span className="font-semibold">{formatPrice(product.price)}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm ml-1">{product.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Vendeur: {product.seller}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
