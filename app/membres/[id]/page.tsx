"use client"

import { useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
  UserPlus,
  UserMinus,
  Share2,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { useProfileByID, useProfiles } from "@/hooks/useUsers"
import { shaowDateFormat } from "@/app/mon-compte/page"

// Sample data
const members = [
  {
    id: "1",
    name: "Kamaha Ulrich",
    role: "Entrepreneur",
    location: "Montréal, QC",
    bio: "Entrepreneur dans le domaine de la technologie, passionné par l'innovation et le développement durable. Après des études en informatique à l'Université de Yaoundé, j'ai déménagé au Canada en 2018 pour poursuivre ma carrière dans la tech. J'ai fondé ma startup spécialisée dans les solutions digitales pour les petites entreprises en 2020.",
    image: "/kamaha.png?height=300&width=300",
    cover: "/kamaha.png?height=400&width=1200",
    joinDate: "Membre depuis 2020",
    contact: {
      email: "kamahaulrich@example.com",
      phone: "+1 (514) 123-4567",
    },
    social: {
      facebook: "#",
      twitter: "#",
      instagram: "#",
      linkedin: "#",
    },
    events: [
      {
        id: "1",
        title: "Soirée Culturelle Camerounaise",
        date: "15 Juin 2024",
        location: "Centre Culturel, Montréal",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    gallery: [
      "/kamaha.png?height=300&width=300&text=1",
      "/kamaha.png?height=300&width=300&text=2",
      "/kamaha.png?height=300&width=300&text=3",
      "/kamaha.png?height=300&width=300&text=4",
      "/kamaha.png?height=300&width=300&text=5",
      "/kamaha.png?height=300&width=300&text=6",
    ],
  },
  {
    id: "2",
    name: "Dirane Joker",
    role: "Devops FullStack",
    location: "Douala, Cameroun",
    bio: "Artiste peintre spécialisée dans l'art contemporain africain. Mes œuvres sont inspirées par la riche culture camerounaise. J'ai étudié aux Beaux-Arts de Paris avant de m'installer au Canada en 2017. J'organise régulièrement des expositions mettant en valeur l'art et la culture africaine.",
    image: "/joker.jpg?height=300&width=300",
    cover: "/joker.jpg?height=400&width=1200",
    joinDate: "Membre depuis 2021",
    contact: {
      email: "marie.lefebvre@example.com",
      phone: "+1 (418) 234-5678",
    },
    social: {
      facebook: "#",
      instagram: "#",
      linkedin: "#",
    },
    events: [
      {
        id: "2",
        title: "Festival Gastronomique",
        date: "22 Juillet 2024",
        location: "Parc Jean-Drapeau, Montréal",
        image: "/placeholder.svg?height=200&width=400",
      },
    ],
    gallery: [
      "/joker.jpg?height=300&width=300&text=1",
      "/joker.jpg?height=300&width=300&text=2",
      "/joker.jpg?height=300&width=300&text=3",
      "/joker.jpg?height=300&width=300&text=4",
    ],
  },
]

export default function MemberPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { toast } = useToast()
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showMessageDialog, setShowMessageDialog] = useState(false)
  const [showImageDialog, setShowImageDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState("")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("about")
  const [message, setMessage] = useState("")

  const { data: profile } = useProfileByID(params.id);
  const { data: profilesList } = useProfiles();

  const headerRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const isBioInView = useInView(bioRef, { once: true })
  const isGalleryInView = useInView(galleryRef, { once: true })

  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.2])
  const headerScale = useTransform(scrollY, [0, 200], [1, 1.05])
  const profileImageY = useTransform(scrollY, [0, 200], [0, 20])

  const member = members.find((m) => m.id === params.id)

  if (!profile) {
    return (
      <div className="container py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-2xl font-bold mb-4">Membre non trouvé</h1>
          <p className="mb-8">Le membre que vous recherchez n&apos;existe pas.</p>
          <Button onClick={() => router.push("/membres")} className="bg-red-600 hover:bg-red-700 text-white">
            Retour à la liste des membres
          </Button>
        </motion.div>
      </div>
    )
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Vous ne suivez plus ce membre" : "Vous suivez maintenant ce membre",
      description: isFollowing
        ? `Vous ne recevrez plus de notifications concernant ${profile?.nom}`
        : `Vous recevrez des notifications concernant les activités de ${profile?.nom}`,
    })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "J'aime retiré" : "Profil aimé",
      description: isLiked
        ? `Vous avez retiré votre j'aime du profil de ${profile?.nom}`
        : `Vous avez aimé le profil de ${profile?.nom}`,
    })
  }

  const handleOpenMessage = () => {
    setShowMessageDialog(true)
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    toast({
      title: "Message envoyé",
      description: `Votre message a été envoyé à ${profile?.nom}`,
    })
    setShowMessageDialog(false)
    setMessage("")
  }

  const handleOpenImage = (image: string, index: number) => {
    setSelectedImage(image)
    setSelectedImageIndex(index)
    setShowImageDialog(true)
  }

  const handleNextImage = () => {
    if (profile.gallery) {

      const newIndex = (selectedImageIndex + 1) % profile.gallery.length
      setSelectedImageIndex(newIndex)
      // setSelectedImage(profile.gallery[newIndex])
    }
  }

  const handlePrevImage = () => {
    if (profile.gallery) {
      const newIndex = selectedImageIndex === 0 ? profile.gallery.length - 1 : selectedImageIndex - 1
      setSelectedImageIndex(newIndex)
      // setSelectedImage(member.gallery[newIndex])

    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Lien copié",
      description: "Le lien du profil a été copié dans le presse-papier",
    })
  }

  return (
    <>
      {/* Hero Section */}
      <motion.div
        ref={headerRef}
        className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
        style={{ opacity: headerOpacity }}
      >
        <motion.div className="absolute inset-0 z-0" style={{ scale: headerScale }}>
          <Image
            src={profile?.avatar_url || "/placeholder.svg?height=800&width=1600"}
            alt={`${profile?.nom} couverture`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
        </motion.div>

        <div className="container relative z-10 h-full flex flex-col justify-end pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col md:flex-row items-start md:items-end gap-6"
          >
            <motion.div className="relative" style={{ y: profileImageY }}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white overflow-hidden shadow-xl"
              >
                <Image
                  src={profile?.avatar_url || "/placeholder.svg"}
                  alt={profile?.nom || 'placeholder.svg'}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="absolute -bottom-2 -right-2 bg-red-600 text-white rounded-full p-2 shadow-lg"
              >
                <Badge className="bg-white text-red-600 hover:bg-white">{profile?.job}</Badge>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-white flex-1"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{profile?.nom}</h1>
              <div className="flex items-center gap-2 text-white/80 mb-4">
                <MapPin className="h-4 w-4" />
                <span>{profile?.pays}</span>
                <span className="mx-2">•</span>
                <Calendar className="h-4 w-4" />
                <span>{profile?.created_at && shaowDateFormat(profile?.created_at)}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex gap-2 mt-4 md:mt-0"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className={`${isFollowing ? "bg-white text-red-600" : "bg-red-600 text-white"} hover:bg-red-700 hover:text-white`}
                  onClick={handleFollow}
                >
                  {isFollowing ? <UserMinus className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                  {isFollowing ? "Suivi" : "Suivre"}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  onClick={handleOpenMessage}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Navigation Bar and Content */}
      <div className="sticky top-0 z-30 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center">
                <TabsList className="bg-gray-100 dark:bg-gray-900">
                  <TabsTrigger value="about" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                    À propos
                  </TabsTrigger>
                  <TabsTrigger
                    value="gallery"
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
                  >
                    Galerie
                  </TabsTrigger>
                  <TabsTrigger value="events" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                    Événements
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/membres")}
              className="text-gray-500 hover:text-red-600"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                  <CardTitle>Informations</CardTitle>
                  <CardDescription className="text-white/80">Détails du profil et coordonnées</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Profession</h3>
                    <p className="font-medium">{profile.job}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Localisation</h3>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-red-600" />
                      <span>{profile.pays}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Membre depuis</h3>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-red-600" />
                      <span>{profile.created_at && shaowDateFormat(profile.created_at)}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Contact</h3>
                    {profile.email && (
                      <motion.div
                        className="flex items-center mb-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mr-3">
                          <Mail className="h-4 w-4" />
                        </div>
                        <a
                          href={`mailto:${profile?.email}`}
                          className="text-sm hover:text-red-600 transition-colors"
                        >
                          {profile?.email}
                        </a>
                      </motion.div>
                    )}
                    {profile.telephone && (
                      <motion.div
                        className="flex items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 mr-3">
                          <Phone className="h-4 w-4" />
                        </div>
                        <a
                          href={`tel:${profile?.telephone}`}
                          className="text-sm hover:text-red-600 transition-colors"
                        >
                          {profile?.telephone}
                        </a>
                      </motion.div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Réseaux sociaux</h3>
                    <div className="flex space-x-3">
                      <div className="flex space-x-2">
                        <motion.a
                          href={profile?.facebookUrl}
                          target="_blank"
                          className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Facebook className="h-3 w-3" />
                        </motion.a>
                        <motion.a
                          href={profile?.instagramUrl}
                          target="_blank"
                          className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Instagram className="h-3 w-3" />
                        </motion.a>
                        <motion.a
                          href={profile?.snapchatUrl}
                          target="_blank"
                          className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Linkedin className="h-3 w-3" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {profile.events && profile.events.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
                    <CardTitle>Événements</CardTitle>
                    <CardDescription className="text-white/80">
                      Événements auxquels {profile?.nom} participe
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {profile.events && profile.events.map((event, index) => (
                        <motion.div
                          key={event.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                          whileHover={{ backgroundColor: "rgba(254, 242, 242, 0.5)" }}
                        >
                          <Link href={`/evenements/${event.id}`}>
                            <div className="flex gap-4 p-4">
                              <div className="relative w-24 h-16 rounded-md overflow-hidden">
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{event.title}</h4>
                                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  <Calendar className="h-3 w-3 mr-1 text-red-600" />
                                  <span>{event.date}</span>
                                </div>
                                <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  <MapPin className="h-3 w-3 mr-1 text-red-600" />
                                  <span>{event.location}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab}>
              <TabsContent value="about" className="mt-0 space-y-6">
                <motion.div
                  ref={bioRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBioInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg">
                    <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                      <CardTitle>À propos de {profile?.nom}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="leading-relaxed text-gray-700 dark:text-gray-300">{profile.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isBioInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg">
                    <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                      <CardTitle>Membres similaires</CardTitle>
                      <CardDescription>D&apos;autres membres qui pourraient vous intéresser</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {profilesList && profilesList
                          .filter((m) => m.id !== member?.id)
                          .slice(0, 2)
                          .map((m, index) => (
                            <motion.div
                              key={m.id}
                              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                              animate={isBioInView ? { opacity: 1, x: 0 } : {}}
                              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                              whileHover={{ backgroundColor: "rgba(254, 242, 242, 0.5)" }}
                            >
                              <Link href={`/membres/${m.id}`}>
                                <div className="flex gap-4 p-4">
                                  <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                    <AvatarImage src={m.avatar_url || "/placeholder.svg"} alt={m.nom} />
                                    <AvatarFallback>{m.nom.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium">{m.nom}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{m.job}</p>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                                      <MapPin className="h-3 w-3 mr-1 text-red-600" />
                                      <span>{m.pays}</span>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="gallery" className="mt-0">
                <motion.div
                  ref={galleryRef}
                  initial={{ opacity: 0 }}
                  animate={isGalleryInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg">
                    <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                      <CardTitle>Galerie de photos</CardTitle>
                      <CardDescription>Photos partagées par {profile?.nom}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {profile.gallery && profile.gallery.map((image, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isGalleryInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                            className="relative aspect-square rounded-xl overflow-hidden shadow-md cursor-pointer"
                            onClick={() => handleOpenImage(image.image, index)}
                          >
                            <Image
                              src={image.image || "/placeholder.svg"}
                              alt={`Photo ${index + 1}`}
                              fill
                              className="object-cover transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-white border-white hover:bg-white/20"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Voir
                                </Button>
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="events" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg">
                    <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                      <CardTitle>Événements</CardTitle>
                      <CardDescription>Événements auxquels {profile?.nom} participe</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      {profile.events && profile.events.length > 0 ? (
                        <div className="space-y-6">
                          {profile.events.map((event, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.5 }}
                              whileHover={{ y: -5 }}
                              className="group"
                            >
                              <Link href={`/evenements/${event.id}`}>
                                <Card className="overflow-hidden border border-gray-100 dark:border-gray-800 group-hover:border-red-200 dark:group-hover:border-red-900/30 transition-colors">
                                  <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                      src={event.image || "/placeholder.svg"}
                                      alt={event.title}
                                      fill
                                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                                      <div className="flex items-center text-white/80 mt-1">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        <span>{event.date}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <CardContent className="p-4">
                                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                                      <MapPin className="h-4 w-4 mr-1 text-red-600" />
                                      <span>{event.location}</span>
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                      <Button className="bg-red-600 hover:bg-red-700 text-white">
                                        Voir les détails
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-gray-500 dark:text-gray-400">
                            {profile?.nom} ne participe à aucun événement pour le moment.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Message Dialog */}
      <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Envoyer un message à {profile?.nom}</DialogTitle>
            <DialogDescription>
              Votre message sera envoyé directement à {profile?.nom}. Vous recevrez une notification lorsqu'il/elle
              répondra.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                rows={5}
                placeholder={`Écrivez votre message à ${profile?.nom}...`}
                className="resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageDialog(false)}>
              Annuler
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              Envoyer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black/95 border-none max-h-[90vh]">
          <div className="relative h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-50 text-white hover:bg-white/20 rounded-full"
              onClick={() => setShowImageDialog(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="relative aspect-square w-full max-h-[80vh] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt={`Photo de ${profile?.nom}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <span className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {profile.gallery?.length}
              </span>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
