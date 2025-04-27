"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"
import { ChatModal } from "@/components/chat-modal"
import { MemberCard } from "@/components/member-card"
import { InvitationNotification } from "@/components/invitation-notification"
import { useAuth } from "@/contexts/AuthContext"
import { useProfiles } from "@/hooks/useUsers"
import { TUser } from "@/types/user"


const professions = [
  "Toutes",
  "Entrepreneur",
  "Artiste",
  "Médecin",
  "Ingénieure",
  "Chef Cuisinier",
  "Professeure",
  "Développeur",
  "Avocate",
]
const locations = ["Toutes", "Montréal, QC", "Québec, QC", "Toronto, ON", "Vancouver, BC", "Ottawa, ON", "Calgary, AB"]

interface Invitations {
  [key: string]: boolean
}

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [professionFilter, setProfessionFilter] = useState("Toutes")
  const [locationFilter, setLocationFilter] = useState("Toutes")
  const [selectedMember, setSelectedMember] = useState<TUser | null>(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [invitations, setInvitations] = useState<Invitations>({})
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const { profile } = useAuth();
  const { data: ProfilesList } = useProfiles()

  const filteredMembers = ProfilesList?.filter((member) => {
    const matchesSearch =
      member.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProfession = professionFilter === "Toutes" || member.job === professionFilter
    const matchesLocation = locationFilter === "Toutes" || member.job === locationFilter

    return matchesSearch && matchesProfession && matchesLocation
  })

  const handleInvitation = (member: TUser, action: "send" | "cancel") => {
    setSelectedMember(member)

    if (action === "send" && member.id) {
      setInvitations({ ...invitations, [member.id]: true })
      setNotificationMessage(`Invitation envoyée à ${member.nom}!`)
    } else {
      if (member.id) {
        setInvitations({ ...invitations, [member.id]: false })
        setNotificationMessage(`Invitation annulée pour ${member.nom}`)
      }
    }

    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const openChat = (member: TUser) => {
    setSelectedMember(member)
    setChatOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[40vh] bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: 'url("/placeholder.svg?height=500&width=500")',
              backgroundSize: "100px",
            }}
          />
        </div>

        <motion.div
          className="container relative z-10 text-center text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            Membres de la Communauté
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Découvrez et connectez-vous avec d&apos;autres membres de la communauté camerounaise au Canada
          </motion.p>
        </motion.div>
      </motion.div>

      <div className="container py-16">
        {/* Search and Filter Section */}
        <motion.div
          className="bg-white rounded-xl shadow-xl p-6 -mt-16 relative z-20 border border-gray-100"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Rechercher un membre..."
                className="pl-10 border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={professionFilter} onValueChange={(value) => setProfessionFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px] border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all">
                <SelectValue placeholder="Profession" />
              </SelectTrigger>
              <SelectContent>
                {professions.map((profession) => (
                  <SelectItem key={profession} value={profession}>
                    {profession}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={(value) => setLocationFilter(value)}>
              <SelectTrigger className="w-full md:w-[180px] border-gray-200 focus:border-red-500 focus:ring-red-500 transition-all">
                <SelectValue placeholder="Lieu" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Members Grid */}
        {ProfilesList?.length === 0 ? (
          <motion.div
            className="text-center py-12 bg-white rounded-lg mt-8 border border-gray-100 shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-2">Aucun membre trouvé</h3>
            <p className="text-gray-600 mb-6">Essayez de modifier vos critères de recherche</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setProfessionFilter("Toutes")
                setLocationFilter("Toutes")
              }}
              className="bg-red-600 hover:bg-red-700 transition-all"
            >
              Réinitialiser les filtres
            </Button>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, staggerChildren: 0.1 }}
          >
            <AnimatePresence>
              {filteredMembers?.map((member, index) => (
                member.id && (<MemberCard
                  key={index}
                  member={member}
                  index={index}
                  isInvited={invitations[member.id]}
                  onInvite={(action) => handleInvitation(member, action)}
                  onChat={() => openChat(member)}
                />)
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Join Community Section */}
        {!profile && <motion.div
          className="mt-24 text-center bg-white rounded-xl shadow-lg p-10 border border-gray-100"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl font-bold mb-4 text-gray-900"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
          >
            Rejoignez notre communauté
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            Vous êtes un Camerounais vivant au Canada? Rejoignez notre communauté pour rencontrer d&apos;autres
            compatriotes, participer à des événements et bénéficier de nombreux avantages.
          </motion.p>
          <Link href="/inscription">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full shadow-lg transition-all">
                Devenir membre
              </Button>
            </motion.div>
          </Link>
        </motion.div>}
      </div>

      {/* Chat Modal */}
      <ChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} member={selectedMember} />

      {/* Invitation Notification */}
      <InvitationNotification show={showNotification} message={notificationMessage} />
    </div>
  )
}
