"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, MapPin, Twitter, UserPlus, UserMinus, MessageCircle, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TUser } from "@/types/user"
import { shaowDateFormat } from "@/app/mon-compte/page"

export interface SocialLinks {
  facebook?: string
  twitter?: string
  instagram?: string
  linkedin?: string
}

export interface Member {
  id: string
  name: string
  role: string
  location: string
  bio: string
  image: string
  joinDate: string
  social: SocialLinks
}

interface MemberCardProps {
  member: TUser
  index: number
  isInvited?: boolean
  onInvite: (action: "send" | "cancel") => void
  onChat: () => void
}

export function MemberCard({ member, index, isInvited, onInvite, onChat }: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full bg-white border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Card Header with Image */}
        <div
          className="relative aspect-[4/3] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={member?.avatar_url || "/placeholder.svg"}
            alt={member?.nom}
            fill
            className="object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />

          {/* Role Badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-red-600 hover:bg-red-700 text-white">{member?.job}</Badge>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Member Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-xl mb-1">{member.nom}</h3>
            <div className="flex items-center text-white/80 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span>{member.pays}</span>
            </div>
          </div>
        </div>

        <CardContent className="p-5">
          {/* Bio */}
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">{member.description}</p>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
              onClick={onChat}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Discuter</span>
            </Button>

            <Button
              variant={isInvited ? "destructive" : "outline"}
              size="sm"
              className={
                isInvited
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "border-gray-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              }
              onClick={() => onInvite(isInvited ? "cancel" : "send")}
            >
              {isInvited ? (
                <>
                  <UserMinus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Annuler</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Inviter</span>
                </>
              )}
            </Button>

            <Link href={`/membres/${member.id}`} className="w-full">
              <Button variant="default" size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                <User className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Profil</span>
              </Button>
            </Link>
          </div>

          {/* Footer with Social Links and Join Date */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex space-x-2">
              <motion.a
                href={member.facebookUrl}
                target="_blank"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="h-3 w-3" />
              </motion.a>
              <motion.a
                href={member.instagramUrl}
                target="_blank"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="h-3 w-3" />
              </motion.a>
              <motion.a
                href={member.snapchatUrl}
                target="_blank"
                className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-3 w-3" />
              </motion.a>
            </div>

            <span className="text-xs text-gray-400">{member.created_at && shaowDateFormat(member.created_at)}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
