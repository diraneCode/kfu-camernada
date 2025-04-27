"use client"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BlogPost } from "@/types/blog-post"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Le titre doit contenir au moins 2 caractères.",
  }),
  slug: z.string().min(2, {
    message: "Le slug doit contenir au moins 2 caractères.",
  }),
  excerpt: z.string().min(10, {
    message: "L'extrait doit contenir au moins 10 caractères.",
  }),
  content: z.string().min(50, {
    message: "Le contenu doit contenir au moins 50 caractères.",
  }),
  author: z.string().min(2, {
    message: "L'auteur doit contenir au moins 2 caractères.",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie.",
  }),
  status: z.string({
    required_error: "Veuillez sélectionner un statut.",
  }),
})

interface BlogPostDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  post: BlogPost | null
}

export function BlogPostDialog({ open, setOpen, post }: BlogPostDialogProps) {
  const isEditing = !!post

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      author: post?.author || "",
      category: post?.category || "",
      status: post?.status || "draft",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Ici, vous implémenteriez la logique pour créer ou mettre à jour l'article
    console.log(isEditing ? "Mise à jour de l'article" : "Création d'un article", values)
    setOpen(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier l'article" : "Ajouter un article"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de l'article ci-dessous."
              : "Remplissez les informations pour créer un nouvel article."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titre</FormLabel>
                  <FormControl>
                    <Input placeholder="Les tendances technologiques de 2023" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="tendances-technologiques-2023" {...field} />
                  </FormControl>
                  <FormDescription>L'URL de l'article (sans espaces ni caractères spéciaux)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extrait</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Un court résumé de l'article" className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenu</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Le contenu complet de l'article"
                      className="resize-none min-h-[200px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auteur</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Technologie">Technologie</SelectItem>
                        <SelectItem value="Productivité">Productivité</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Cuisine">Cuisine</SelectItem>
                        <SelectItem value="Bien-être">Bien-être</SelectItem>
                        <SelectItem value="Voyage">Voyage</SelectItem>
                        <SelectItem value="Éducation">Éducation</SelectItem>
                        <SelectItem value="Jardinage">Jardinage</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="published">Publié</SelectItem>
                        <SelectItem value="scheduled">Programmé</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">{isEditing ? "Mettre à jour" : "Créer"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
