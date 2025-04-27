"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/components/cart-provider"
import { formatPrice, generateId } from "@/lib/utils"
import { Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"

// Sample data
const products = [
  {
    id: "1",
    name: "Tissu Traditionnel",
    description:
      "Tissu traditionnel camerounais aux motifs colorés. Ce tissu de haute qualité est fabriqué à la main par des artisans camerounais selon des techniques traditionnelles transmises de génération en génération. Les motifs colorés représentent des symboles importants de la culture camerounaise et racontent une histoire riche en traditions. Parfait pour la confection de vêtements, d'accessoires ou de décorations d'intérieur.",
    price: 79.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Vêtements",
    rating: 4.8,
    reviews: 24,
    seller: {
      name: "Artisanat Camerounais",
      rating: 4.9,
      products: 45,
      image: "/placeholder.svg?height=100&width=100",
    },
    specifications: [
      { name: "Matériau", value: "Coton" },
      { name: "Dimensions", value: "2m x 1.5m" },
      { name: "Origine", value: "Cameroun" },
      { name: "Fabrication", value: "Artisanale" },
    ],
    stock: 15,
    shipping: "Livraison internationale disponible",
    relatedProducts: ["2", "4", "6"],
  },
  {
    id: "2",
    name: "Épices Camerounaises",
    description:
      "Assortiment d'épices authentiques du Cameroun. Cet assortiment comprend une sélection d'épices soigneusement choisies pour vous faire découvrir les saveurs authentiques de la cuisine camerounaise. Chaque épice est récoltée à la main et conditionnée pour préserver sa fraîcheur et son arôme. Idéal pour préparer des plats traditionnels camerounais ou pour ajouter une touche exotique à vos recettes habituelles.",
    price: 24.99,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Alimentation",
    rating: 4.5,
    reviews: 18,
    seller: {
      name: "Saveurs d'Afrique",
      rating: 4.7,
      products: 32,
      image: "/placeholder.svg?height=100&width=100",
    },
    specifications: [
      { name: "Contenu", value: "5 épices différentes" },
      { name: "Poids", value: "250g" },
      { name: "Origine", value: "Cameroun" },
      { name: "Conservation", value: "12 mois" },
    ],
    stock: 25,
    shipping: "Livraison internationale disponible",
    relatedProducts: ["5", "7", "1"],
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
        <p className="mb-8">Le produit que vous recherchez n&apos;existe pas.</p>
        <Button onClick={() => router.push("/marketplace")} className="bg-red-600 hover:bg-red-700">
          Retour à la marketplace
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${generateId()}`,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    })

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} ajouté à votre panier`,
    })
  }

  const handleAddToWishlist = () => {
    toast({
      title: "Produit ajouté aux favoris",
      description: `${product.name} a été ajouté à votre liste de favoris`,
    })
  }

  const relatedProductsData = products.filter((p) => product.relatedProducts.includes(p.id))

  return (
    <div className="container py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer ${
                  activeImage === index ? "ring-2 ring-red-600" : "ring-1 ring-gray-200 dark:ring-gray-800"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600 dark:text-gray-400">({product.reviews} avis)</span>
              </div>
              <span className="text-gray-600 dark:text-gray-400">Catégorie: {product.category}</span>
            </div>
            <div className="text-3xl font-bold mb-4">{formatPrice(product.price)}</div>
            <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>
          </div>

          <Separator className="my-6" />

          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Quantité</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">{product.stock} en stock</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-red-600 hover:bg-red-700" size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au panier
              </Button>
              <Button variant="outline" size="lg" onClick={handleAddToWishlist}>
                <Heart className="mr-2 h-5 w-5" />
                Ajouter aux favoris
              </Button>
            </div>

            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Truck className="h-5 w-5 mr-2" />
              <span>{product.shipping}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-400">Partager:</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => {
                  toast({
                    title: "Lien copié",
                    description: "Le lien du produit a été copié dans le presse-papier",
                  })
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={product.seller.image || "/placeholder.svg"}
                  alt={product.seller.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{product.seller.name}</h3>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>
                    {product.seller.rating} • {product.seller.products} produits
                  </span>
                </div>
              </div>
              <Link href={`/marketplace/vendeur/${product.seller.name}`} className="ml-auto">
                <Button variant="outline" size="sm">
                  Voir le profil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({product.reviews})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Description du produit</h3>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{product.description}</p>
          </TabsContent>
          <TabsContent value="specifications">
            <h3 className="text-xl font-semibold mb-4">Spécifications</h3>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={spec.name} className={index % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : ""}>
                      <td className="py-3 px-4 font-medium">{spec.name}</td>
                      <td className="py-3 px-4">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="reviews">
            <h3 className="text-xl font-semibold mb-4">Avis des clients ({product.reviews})</h3>
            <div className="space-y-6">
              {/* Sample reviews */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden mr-4">
                      <Image src="/placeholder.svg?height=100&width=100" alt="Avatar" fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium">Client {i + 1}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${
                              j < 4 + (i % 2) ? "text-yellow-500 fill-yellow-500" : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">il y a {i + 1} mois</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    Excellent produit, je suis très satisfait de mon achat. La qualité est au rendez-vous et la
                    livraison a été rapide.
                    {i === 0 && " Je recommande vivement ce vendeur et ses produits."}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {relatedProductsData.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProductsData.map((product) => (
              <Link key={product.id} href={`/marketplace/${product.id}`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium group-hover:text-red-600 transition-colors">{product.name}</h3>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-semibold">{formatPrice(product.price)}</span>
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
        </div>
      )}
    </div>
  )
}
