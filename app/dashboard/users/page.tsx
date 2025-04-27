"use client"

import { useState } from "react"
import { UserCreateForm } from "@/components/users/user-create-form"
import { UserEditForm } from "@/components/users/user-edit-form"
import { UsersList } from "@/components/users/users-list"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { TUser } from "@/types/user"
import { useProfiles } from "@/hooks/useUsers"

export default function UsersPage() {
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null)
  const { data: profilesList } = useProfiles();

  const handleEdit = (user: TUser) => {
    setSelectedUser(user)
    setEditOpen(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs de votre plateforme.</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel utilisateur
        </Button>
      </div>
      <Separator />

      {profilesList && <UsersList data={profilesList} onEdit={handleEdit} />}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un utilisateur</DialogTitle>
            <DialogDescription>Créez un nouvel utilisateur pour votre plateforme.</DialogDescription>
          </DialogHeader>
          <UserCreateForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l&apos;utilisateur</DialogTitle>
            <DialogDescription>Modifiez les informations de l&apos;utilisateur sélectionné.</DialogDescription>
          </DialogHeader>
          {selectedUser && <UserEditForm user={selectedUser} onSuccess={() => setEditOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
