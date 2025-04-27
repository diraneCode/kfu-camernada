// "use client"

// import { useState } from "react"
// import { OrderCreateForm } from "@/components/orders/order-create-form"
// import { OrderEditForm } from "@/components/orders/order-edit-form"
// import { OrdersList } from "@/components/orders/orders-list"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import type { Order } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"

export default function OrdersPage() {
  // const [createOpen, setCreateOpen] = useState(false)
  // const [editOpen, setEditOpen] = useState(false)
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // const handleEdit = (order: Order) => {
  //   setSelectedOrder(order)
  //   setEditOpen(true)
  // }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Commandes</h1>
          <p className="text-muted-foreground">Gérez les commandes de votre plateforme.</p>
        </div>
        {/* <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvelle commande
        </Button> */}
      </div>
      <Separator />

      {/* <OrdersList onEdit={handleEdit} />

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter une commande</DialogTitle>
            <DialogDescription>Créez une nouvelle commande pour votre plateforme.</DialogDescription>
          </DialogHeader>
          <OrderCreateForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog> */}

      {/* <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier la commande</DialogTitle>
            <DialogDescription>Modifiez les informations de la commande sélectionnée.</DialogDescription>
          </DialogHeader>
          {selectedOrder && <OrderEditForm order={selectedOrder} onSuccess={() => setEditOpen(false)} />}
        </DialogContent>
      </Dialog> */}
    </div>
  )
}
