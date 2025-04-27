import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Upload, DollarSign, MapPin, Truck, Send } from "lucide-react"

export const metadata: Metadata = {
  title: "Vendre un produit | Boutique CamerNada",
  description: "Mettez en vente vos produits camerounais sur notre boutique communautaire",
}

// Mock data for categories
const categories = [
  { id: 1, name: "Nourriture", count: 42 },
  { id: 2, name: "Vêtements", count: 28 },
  { id: 3, name: "Artisanat", count: 23 },
  { id: 4, name: "Bijoux", count: 15 },
  { id: 5, name: "Beauté", count: 12 },
  { id: 6, name: "Livres", count: 8 },
]

// Mock data for cities
const cities = [
  { id: 1, name: "Montréal" },
  { id: 2, name: "Toronto" },
  { id: 3, name: "Ottawa" },
  { id: 4, name: "Québec" },
  { id: 5, name: "Vancouver" },
  { id: 6, name: "Calgary" },
  { id: 7, name: "Edmonton" },
  { id: 8, name: "Winnipeg" },
]

export default function SellProductPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/store">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à la boutique
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-4">Vendre un produit</h1>
        <p className="text-gray-600">
          Partagez vos produits camerounais avec la communauté et développez votre activité.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Informations sur le produit</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block font-medium">
                    Nom du produit *
                  </label>
                  <Input id="title" placeholder="Ex: Bâton de manioc traditionnel" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="block font-medium">
                    Description *
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Décrivez votre produit en détail..."
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="category" className="block font-medium">
                      Catégorie *
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.name.toLowerCase()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="condition" className="block font-medium">
                      État *
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez l'état" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">Neuf</SelectItem>
                        <SelectItem value="like-new">Comme neuf</SelectItem>
                        <SelectItem value="good">Bon état</SelectItem>
                        <SelectItem value="used">Utilisé</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="images" className="block font-medium">
                    Images du produit *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Glissez-déposez des images ou cliquez pour parcourir</p>
                      <p className="text-xs text-gray-400 mb-4">PNG, JPG ou JPEG (max. 5 MB par image, 5 images max)</p>
                      <Button variant="outline" size="sm">
                        Parcourir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">Prix et disponibilité</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="price" className="block font-medium">
                      Prix ($) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="quantity" className="block font-medium">
                      Quantité disponible *
                    </label>
                    <Input id="quantity" type="number" min="1" placeholder="1" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-medium">Options de livraison *</label>
                  <RadioGroup defaultValue="both">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Livraison et retrait en personne</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Livraison uniquement</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">Retrait en personne uniquement</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block font-medium">
                    Votre localisation *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Select>
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Sélectionnez votre ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.id} value={city.name.toLowerCase()}>
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="shipping-fee" className="block font-medium">
                    Frais de livraison ($)
                  </label>
                  <div className="relative">
                    <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input id="shipping-fee" type="number" min="0" step="0.01" placeholder="0.00" className="pl-10" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Link href="/store">
              <Button variant="outline" className="mr-4">
                Annuler
              </Button>
            </Link>
            <Link href="/store">
              <Button className="flex items-center group relative overflow-hidden">
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-primary to-red-500"></span>
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-red-500 to-primary"></span>
                <span className="relative flex items-center z-10">
                  <Send className="mr-2 h-4 w-4" />
                  Mettre en vente
                </span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Conseils pour bien vendre</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Utilisez des photos claires et de qualité</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Soyez précis dans votre description</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Fixez un prix compétitif</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Répondez rapidement aux acheteurs intéressés</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <span>Soyez transparent sur l'état du produit</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Règles de vente</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Notre boutique est un espace de commerce équitable. Merci de respecter ces règles :
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Produits authentiques et de qualité</li>
                  <li>• Prix raisonnables et transparents</li>
                  <li>• Descriptions honnêtes et précises</li>
                  <li>• Respect des délais de livraison</li>
                  <li>• Pas de contrefaçons ou produits illégaux</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

