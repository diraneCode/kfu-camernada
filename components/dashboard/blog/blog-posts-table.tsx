"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/types/blog-post"

// Données simulées
const data: BlogPost[] = [
  {
    id: "1",
    title: "Les tendances technologiques de 2023",
    slug: "tendances-technologiques-2023",
    excerpt: "Découvrez les technologies qui vont façonner l'année 2023.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Jean Dupont",
    category: "Technologie",
    status: "published",
    publishedAt: "2023-01-15T09:24:00",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "2",
    title: "Comment améliorer votre productivité",
    slug: "ameliorer-productivite",
    excerpt: "Astuces et conseils pour être plus productif au quotidien.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Marie Martin",
    category: "Productivité",
    status: "published",
    publishedAt: "2023-02-20T14:35:00",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "3",
    title: "Guide du débutant pour l'investissement",
    slug: "guide-debutant-investissement",
    excerpt: "Tout ce que vous devez savoir pour commencer à investir.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Pierre Durand",
    category: "Finance",
    status: "draft",
    publishedAt: "2023-03-10T11:15:00",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "4",
    title: "Recettes végétariennes pour l'été",
    slug: "recettes-vegetariennes-ete",
    excerpt: "Des idées de plats frais et légers pour la saison estivale.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Sophie Lefebvre",
    category: "Cuisine",
    status: "published",
    publishedAt: "2023-04-05T16:42:00",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "5",
    title: "Les bienfaits de la méditation",
    slug: "bienfaits-meditation",
    excerpt: "Comment la méditation peut améliorer votre bien-être mental.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Thomas Bernard",
    category: "Bien-être",
    status: "scheduled",
    publishedAt: "2023-05-18T08:30:00",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "6",
    title: "Voyager à petit budget",
    slug: "voyager-petit-budget",
    excerpt: "Conseils pour explorer le monde sans se ruiner.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Julie Petit",
    category: "Voyage",
    status: "published",
    publishedAt: "2023-06-22T13:20:00",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "7",
    title: "Apprendre une nouvelle langue rapidement",
    slug: "apprendre-nouvelle-langue",
    excerpt: "Méthodes efficaces pour maîtriser une langue étrangère.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Nicolas Robert",
    category: "Éducation",
    status: "draft",
    publishedAt: "2023-07-14T10:05:00",
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "8",
    title: "Les bases du jardinage urbain",
    slug: "bases-jardinage-urbain",
    excerpt: "Comment créer un jardin dans un espace limité en ville.",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    author: "Camille Richard",
    category: "Jardinage",
    status: "published",
    publishedAt: "2023-08-30T15:50:00",
    image: "/placeholder.svg?height=100&width=200",
  },
]

interface BlogPostsTableProps {
  searchQuery: string
  onEdit: (post: BlogPost) => void
}

export function BlogPostsTable({ searchQuery, onEdit }: BlogPostsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deletePostId, setDeletePostId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => {
        const post = row.original
        return (
          <div className="flex items-center gap-3">
            <img src={post.image || "/placeholder.svg"} alt={post.title} className="h-10 w-16 rounded object-cover" />
            <div>
              <div className="font-medium">{post.title}</div>
              <div className="text-xs text-muted-foreground truncate max-w-[250px]">{post.excerpt}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "author",
      header: "Auteur",
    },
    {
      accessorKey: "category",
      header: "Catégorie",
      cell: ({ row }) => {
        return (
          <Badge variant="outline" className="capitalize">
            {row.getValue("category")}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            // variant={status === "published" ? "success" : status === "draft" ? "outline" : "secondary"}
            className="capitalize"
          >
            {status === "published" ? "Publié" : status === "draft" ? "Brouillon" : "Programmé"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "publishedAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("publishedAt") as string)
        return <div>{date.toLocaleDateString("fr-FR")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir le menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(post)}>Modifier</DropdownMenuItem>
              <DropdownMenuItem>Aperçu</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  setDeletePostId(post.id)
                  setIsDeleteDialogOpen(true)
                }}
              >
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Filtrer les données en fonction de la recherche
  const filteredData = data.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleDeletePost = () => {
    // Ici, vous implémenteriez la logique de suppression réelle
    console.log(`Suppression de l'article avec l'ID: ${deletePostId}`)
    setIsDeleteDialogOpen(false)
    setDeletePostId(null)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} article(s) au total
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Suivant
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement l'article et toutes les données
              associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
