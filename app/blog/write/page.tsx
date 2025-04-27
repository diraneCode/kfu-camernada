import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Send, Image, LinkIcon, Bold, Italic, List, ListOrdered, Quote } from "lucide-react"

export const metadata: Metadata = {
  title: "Écrire un article | Blog CamerNada",
  description: "Partagez vos connaissances et expériences avec la communauté",
}

// Mock data for categories
const categories = [
  { id: 1, name: "Immigration", count: 24 },
  { id: 2, name: "Culture", count: 18 },
  { id: 3, name: "Gastronomie", count: 15 },
  { id: 4, name: "Éducation", count: 12 },
  { id: 5, name: "Entrepreneuriat", count: 10 },
  { id: 6, name: "Santé", count: 8 },
  { id: 7, name: "Sports", count: 5 },
  { id: 8, name: "Technologie", count: 4 },
]

export default function WriteArticlePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au blog
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-4">Écrire un article</h1>
        <p className="text-gray-600">
          Partagez vos connaissances, expériences et conseils avec la communauté camerounaise au Canada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md mb-6">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block font-medium">
                    Titre de l'article *
                  </label>
                  <Input id="title" placeholder="Un titre accrocheur et descriptif" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="excerpt" className="block font-medium">
                    Extrait *
                  </label>
                  <Textarea id="excerpt" placeholder="Un court résumé de votre article (150-200 caractères)" required />
                </div>

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
                  <label htmlFor="featured-image" className="block font-medium">
                    Image principale
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Image className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Glissez-déposez une image ou cliquez pour parcourir</p>
                      <p className="text-xs text-gray-400 mb-4">PNG, JPG ou JPEG (max. 5 MB)</p>
                      <Button variant="outline" size="sm">
                        Parcourir
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Contenu de l'article</h2>
                  <Tabs defaultValue="write">
                    <TabsList>
                      <TabsTrigger value="write">Écrire</TabsTrigger>
                      <TabsTrigger value="preview">Aperçu</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="border rounded-md">
                  <div className="flex items-center gap-1 p-2 border-b">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <div className="h-4 w-px bg-gray-300 mx-1"></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <div className="h-4 w-px bg-gray-300 mx-1"></div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <LinkIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Quote className="h-4 w-4" />
                    </Button>
                  </div>
                  <Textarea
                    id="content"
                    placeholder="Commencez à écrire votre article ici..."
                    className="min-h-[400px] border-0 rounded-none focus-visible:ring-0"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Link href="/blog">
                    <Button variant="outline" className="mr-4">
                      Enregistrer comme brouillon
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button className="flex items-center group relative overflow-hidden">
                      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-primary to-red-500"></span>
                      <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-red-500 to-primary"></span>
                      <span className="relative flex items-center z-10">
                        <Send className="mr-2 h-4 w-4" />
                        Publier l'article
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Conseils pour un bon article</h2>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span>Choisissez un titre clair et accrocheur</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span>Structurez votre article avec des sous-titres</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span>Utilisez des exemples concrets et personnels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      4
                    </span>
                    <span>Ajoutez des images pour illustrer vos propos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      5
                    </span>
                    <span>Relisez et corrigez avant de publier</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-primary/5">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Règles de publication</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Notre blog est un espace de partage constructif. Merci de respecter ces règles :
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Pas de contenu offensant ou discriminatoire</li>
                  <li>• Pas de publicité non autorisée</li>
                  <li>• Respectez la propriété intellectuelle</li>
                  <li>• Vérifiez vos sources et informations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

