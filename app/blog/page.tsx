import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, ArrowRight, Tag, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog | Solidarité CamerNada",
  description: "Articles et partages de la communauté camerounaise au Canada",
}

// Mock data for blog posts
const posts = [
  {
    id: 1,
    title: "Guide complet pour les nouveaux arrivants camerounais au Canada",
    excerpt:
      "Tout ce que vous devez savoir pour bien démarrer votre nouvelle vie au Canada : démarches administratives, logement, emploi, etc.",
    content: "Lorem ipsum dolor sit amet...",
    author: "Sophie Kamdem",
    authorPhoto: "/blog1.jpeg?height=100&width=100&text=SK",
    date: "2023-12-01",
    category: "Immigration",
    image: "/blog1.jpeg?height=400&width=800&text=Immigration",
    readTime: 8,
    featured: true,
  },
  {
    id: 2,
    title: "Les 10 restaurants camerounais à ne pas manquer à Montréal",
    excerpt:
      "Découvrez les meilleurs endroits pour déguster une cuisine camerounaise authentique dans la métropole québécoise.",
    content: "Lorem ipsum dolor sit amet...",
    author: "Jean-Paul Mbarga",
    authorPhoto: "/placeholder.svg?height=100&width=100&text=JPM",
    date: "2023-11-25",
    category: "Gastronomie",
    image: "/placeholder.svg?height=400&width=800&text=Gastronomie",
    readTime: 5,
    featured: false,
  },
  {
    id: 3,
    title: "Comment faire reconnaître vos diplômes camerounais au Canada",
    excerpt:
      "Le processus d'équivalence des diplômes étrangers peut être complexe. Voici un guide étape par étape pour vous faciliter la tâche.",
    content: "Lorem ipsum dolor sit amet...",
    author: "Marie Nguemo",
    authorPhoto: "/placeholder.svg?height=100&width=100&text=MN",
    date: "2023-11-18",
    category: "Éducation",
    image: "/placeholder.svg?height=400&width=800&text=Éducation",
    readTime: 10,
    featured: false,
  },
  {
    id: 4,
    title: "Le choc culturel : témoignages de Camerounais au Canada",
    excerpt:
      "Plusieurs membres de notre communauté partagent leurs expériences et conseils pour gérer l'adaptation culturelle.",
    content: "Lorem ipsum dolor sit amet...",
    author: "Thomas Etoa",
    authorPhoto: "/placeholder.svg?height=100&width=100&text=TE",
    date: "2023-11-10",
    category: "Culture",
    image: "/placeholder.svg?height=400&width=800&text=Culture",
    readTime: 7,
    featured: false,
  },
  {
    id: 5,
    title: "Les opportunités d'entrepreneuriat pour la diaspora camerounaise",
    excerpt: "Découvrez comment certains membres de notre communauté ont réussi à créer leurs entreprises au Canada.",
    content: "Lorem ipsum dolor sit amet...",
    author: "Carine Fouda",
    authorPhoto: "/placeholder.svg?height=100&width=100&text=CF",
    date: "2023-11-05",
    category: "Entrepreneuriat",
    image: "/placeholder.svg?height=400&width=800&text=Entrepreneuriat",
    readTime: 9,
    featured: false,
  },
  {
    id: 6,
    title: "Célébrer les fêtes camerounaises au Canada : traditions et adaptations",
    excerpt: "Comment maintenir nos traditions festives tout en s'adaptant au contexte canadien.",
    content: "Lorem ipsum dolor sit amet...",
    author: "Pascal Ndongo",
    authorPhoto: "/placeholder.svg?height=100&width=100&text=PN",
    date: "2023-10-28",
    category: "Culture",
    image: "/placeholder.svg?height=400&width=800&text=Traditions",
    readTime: 6,
    featured: false,
  },
]

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

export default function BlogPage() {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("fr-CA", options)
  }

  // Find featured post
  const featuredPost = posts.find((post) => post.featured)
  const regularPosts = posts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Blog communautaire</h1>
        <p className="text-xl text-gray-600">
          Articles, conseils et partages d'expériences par et pour la communauté camerounaise au Canada.
        </p>
      </div>

      {featuredPost && (
        <div className="mb-12">
          <Card className="overflow-hidden border-none shadow-lg street-border">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden"></div>
                </div>
                <div className="relative p-6 md:p-8 flex flex-col justify-center">
                  <Badge className="mb-4 inline-flex bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    Article à la une
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    <Link href={`/blog/${featuredPost.id}`} className="hover:text-primary transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-2 md:line-clamp-3">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src={featuredPost.authorPhoto || "/placeholder.svg"}
                          alt={featuredPost.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center">
                        Lire plus
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6 sticky top-20">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input type="text" placeholder="Rechercher un article" className="pl-10" />
                  </div>
                </div>

                <Link href="/blog/write">
                  <Button className="w-full flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Écrire un article
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold mb-4">Catégories</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 text-primary mr-2" />
                        <span>{category.name}</span>
                      </div>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all h-full"
              >
                <div className="relative h-48">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm text-primary">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>{post.readTime} min de lecture</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                        <img
                          src={post.authorPhoto || "/placeholder.svg"}
                          alt={post.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm">{post.author}</span>
                    </div>
                    <Link href={`/blog/${post.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary/80 hover:bg-transparent p-0"
                      >
                        Lire plus
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline" className="flex items-center">
              Charger plus d'articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

