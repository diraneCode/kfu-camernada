"use client"

import { useState } from "react"
import { EventCreateForm } from "@/components/events/event-create-form"
import { EventEditForm } from "@/components/events/event-edit-form"
import { EventsList } from "@/components/events/events-list"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import type { IEvent } from "@/types/event"
import { useEvent } from "@/hooks/useEvent"

export default function EventsPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null)
  const { data: eventList } = useEvent();

  const handleEdit = (event: IEvent) => {
    setSelectedEvent(event)
    setEditOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Évènements</h1>
          <p className="text-muted-foreground">Gérez les évènements de votre plateforme.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel évènement
        </Button>
      </div>
      <Separator />

      {eventList && <EventsList data={eventList} onEdit={handleEdit} />}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-4xl sm:max-w-2xl w-ful max-h-[90vh] overflow-y-auto transition-all duration-300 ease-in-out">
          <DialogHeader>
            <DialogTitle>Ajouter un évènement</DialogTitle>
            <DialogDescription>Créez un nouvel évènement pour votre plateforme.</DialogDescription>
          </DialogHeader>
          <EventCreateForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l&apos;évènement</DialogTitle>
            <DialogDescription>Modifiez les informations de l&apos;évènement sélectionné.</DialogDescription>
          </DialogHeader>
          {selectedEvent && <EventEditForm event={selectedEvent} onSuccess={() => setEditOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
