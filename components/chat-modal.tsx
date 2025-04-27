"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, X, Smile, Paperclip } from "lucide-react"
import type { Member } from "./member-card"
import { TUser } from "@/types/user"

interface Message {
  id: number
  sender: "me" | "other"
  text: string
  time: string
}

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  member: TUser | null
}

// Sample messages for demo
const sampleMessages: Message[] = [
  { id: 1, sender: "other", text: "Salut! Comment ça va?", time: "10:30" },
  { id: 2, sender: "me", text: "Très bien, merci! Et toi?", time: "10:31" },
  {
    id: 3,
    sender: "other",
    text: "Ça va bien! Je voulais te parler de l'événement de la semaine prochaine.",
    time: "10:32",
  },
  { id: 4, sender: "me", text: "Bien sûr, je suis intéressé!", time: "10:33" },
]

export function ChatModal({ isOpen, onClose, member }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!member) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-xl max-h-[90vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-[600px] max-h-[90vh]"
            >
              {/* Chat Header */}
              <DialogHeader className="px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between bg-gradient-to-r from-red-600 to-red-700 text-white">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    <Image src={member.avatar_url || "/placeholder.svg"} alt={member.nom} fill className="object-cover" />
                  </div>
                  <div>
                    <DialogTitle className="text-white">{member.nom}</DialogTitle>
                    <p className="text-white/80 text-sm">{member.job}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </DialogHeader>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "me"
                            ? "bg-red-600 text-white rounded-tr-none"
                            : "bg-white border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "me" ? "text-white/70" : "text-gray-500"}`}>
                          {message.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Écrivez votre message..."
                    className="flex-1 border-gray-200 focus:border-red-500 focus:ring-red-500"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-red-600 hover:bg-red-700 text-white rounded-full"
                      size="icon"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
