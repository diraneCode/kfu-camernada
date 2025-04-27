"use client"

import { useState } from "react"
import { VendorCreateForm } from "@/components/vendors/vendor-create-form"
import { VendorEditForm } from "@/components/vendors/vendor-edit-form"
import { VendorsList } from "@/components/vendors/vendors-list"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import type { Vendor } from "@/types/vendor"

export default function VendorsPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)

  const handleEdit = (vendor: Vendor) => {
    setSelectedVendor(vendor)
    setEditOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendeurs</h1>
          <p className="text-muted-foreground">Gérez les vendeurs de votre plateforme.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau vendeur
        </Button>
      </div>
      <Separator />

      <VendorsList onEdit={handleEdit} />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un vendeur</DialogTitle>
            <DialogDescription>Créez un nouveau vendeur pour votre plateforme.</DialogDescription>
          </DialogHeader>
          <VendorCreateForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier le vendeur</DialogTitle>
            <DialogDescription>Modifiez les informations du vendeur sélectionné.</DialogDescription>
          </DialogHeader>
          {selectedVendor && <VendorEditForm vendor={selectedVendor} onSuccess={() => setEditOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
