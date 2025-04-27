// "use client"

// import { useState } from "react"
// import { BlogPostCreateForm } from "@/components/blog/blog-post-create-form"
// import { BlogPostEditForm } from "@/components/blog/blog-post-edit-form"
// import { BlogPostsList } from "@/components/blog/blog-posts-list"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Plus } from "lucide-react"
// import type { BlogPost } from "@/types/blog-post"
import { Separator } from "@/components/ui/separator"

export default function BlogPage() {
  // const [createOpen, setCreateOpen] = useState(false)
  // const [editOpen, setEditOpen] = useState(false)
  // const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  // const handleEdit = (post: BlogPost) => {
  //   setSelectedPost(post)
  //   setEditOpen(true)
  // }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Gérez les articles du blog de votre plateforme.</p>
        </div>
        {/* <Button onClick={() => setCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nouvel article
        </Button> */}
      </div>
      <Separator />

      {/* <BlogPostsList onEdit={handleEdit} /> */}

      {/* <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ajouter un article</DialogTitle>
            <DialogDescription>Créez un nouvel article pour votre blog.</DialogDescription>
          </DialogHeader>
          <BlogPostCreateForm onSuccess={() => setCreateOpen(false)} />
        </DialogContent>
      </Dialog> */}

      {/* <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Modifier l&apos;article</DialogTitle>
            <DialogDescription>Modifiez les informations de l&apos;article sélectionné.</DialogDescription>
          </DialogHeader>
          {selectedPost && <BlogPostEditForm post={selectedPost} onSuccess={() => setEditOpen(false)} />}
        </DialogContent>
      </Dialog> */}
    </div>
  )
}
