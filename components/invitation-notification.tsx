"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Check } from "lucide-react"

interface InvitationNotificationProps {
  show: boolean
  message: string
}

export function InvitationNotification({ show, message }: InvitationNotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 50, x: "-50%" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white border border-gray-100 shadow-lg rounded-full px-6 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
              <Check className="h-5 w-5 text-white" />
            </div>
            <p className="font-medium text-gray-800">{message}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
