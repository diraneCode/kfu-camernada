"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Edit, MoreHorizontal, Trash } from "lucide-react"
import type { BlogPost } from "@/types/blog-post"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface BlogPostsListProps {
  onEdit: (post: BlogPost) => void
}

const dummyPosts: BlogPost[] = [
  {
    id: "1",
    title: "Les tendances technologiques en 2023",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, odio vitae aliquam tincidunt, nisl turpis aliquet nunc, vitae aliquam nunc nisl vitae nisl.",
    excerpt: "Découvrez les dernières tendances technologiques qui vont façonner l'année 2023.",
    author: "Jean Dupont",
    coverImage: "/placeholder.svg?height=40&width=40",
    publishedAt: new Date("2023-01-15"),
    createdAt: new Date("2023-01-10"),
    status: "published",
    tags: ["technologie", "innovation", "tendances"],
  },
  {
    id: "2",
    title: "Guide complet du marketing digital",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, odio vitae aliquam tincidunt, nisl turpis aliquet nunc, vitae aliquam nunc nisl vitae nisl.",
    excerpt: "Tout ce que vous devez savoir pour réussir vos campagnes de marketing digital.",
    author: "Marie Leroy",
    coverImage: "/placeholder.svg?height=40&width=40",
    publishedAt: new Date("2023-02-05"),
    createdAt: new Date("2023-01-28"),
    status: "published",
    tags: ["marketing", "digital", "stratégie"],
  },
  {
    id: "3",
    title: "L'impact de l'IA sur l'économie",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, odio vitae aliquam tincidunt, nisl turpis aliquet nunc, vitae aliquam nunc nisl vitae nisl.",
    excerpt: "Analyse des effets de l'intelligence artificielle sur différents secteurs économiques.",
    author: "Pierre Martin",
    coverImage: "/placeholder.svg?height=40&width=40",
    createdAt: new Date("2023-03-10"),
    status: "draft",
    tags: ["IA", "économie", "innovation"],
  },
  {
    id: "4",
    title: "5 conseils pour améliorer votre productivité",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, odio vitae aliquam tincidunt, nisl turpis aliquet nunc, vitae aliquam nunc nisl vitae nisl.",
    excerpt: "Des astuces simples et efficaces pour mieux gérer votre temps et votre travail.",
    author: "Sophie Petit",
    coverImage: "/placeholder.svg?height=40&width=40",
    publishedAt: new Date("2023-04-18"),
    createdAt: new Date("2023-04-12"),
    status: "published",
    tags: ["productivité", "travail", "conseils"],
  },
  {
    id: "5",
    title: "La cybersécurité pour les entreprises",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam, odio vitae aliquam tincidunt, nisl turpis aliquet nunc, vitae aliquam nunc nisl vitae nisl.",
    excerpt: "Les mesures essentielles pour protéger votre entreprise contre les cyberattaques.",
    author: "Thomas Blanc",
    coverImage: "/placeholder.svg?height=40&width=40",
    publishedAt: new Date("2023-05-20"),
    createdAt: new Date("2023-05-15"),
    status: "archived",
    tags: ["cybersécurité", "entreprise", "sécurité"],
  },
]

export function BlogPostsList({ onEdit }: BlogPostsListProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null)

  const statusColorMap = {
    published: "bg-emerald-500 hover:bg-emerald-600",
    draft: "bg-amber-500 hover:bg-amber-600",
    archived: "bg-gray-500 hover:bg-gray-600",
  }

  const statusLabels = {
    published: "Publié",
    draft: "Brouillon",
    archived: "Archivé",
  }

  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: "title",
      header: "Article",
      cell: ({ row }) => {
        const post = row.original
        return (
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded">
              <Image
                src={post.coverImage || "/placeholder.svg?height=40&width=40"}
                alt={post.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div className="font-medium">{post.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</div>
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
      accessorKey: "publishedAt",
      header: "Date de publication",
      cell: ({ row }) => {
        const date = row.getValue("publishedAt") as Date | undefined
        return date ? (
          <div>{date.toLocaleDateString("fr-FR")}</div>
        ) : (
          <span className="text-muted-foreground">Non publié</span>
        )
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.getValue("tags") as string[]
        return (
          <div className="flex flex-wrap gap-1 max-w-[200px]">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 2}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge className={statusColorMap[status as keyof typeof statusColorMap]}>
            {statusLabels[status as keyof typeof statusLabels]}
          </Badge>
        )
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(post)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setPostToDelete(post)
                  setDeleteConfirmOpen(true)
                }}
                className="text-red-600"
              >
                <Trash className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: dummyPosts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleDeletePost = () => {
    // Dans une application réelle, vous appelleriez une API ici
    console.log(`Suppression de l'article : ${postToDelete?.id}`)
    setDeleteConfirmOpen(false)
    setPostToDelete(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par titre..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuItem
                    key={column.id}
                    className="capitalize"
                    onClick={() => column.toggleVisibility(!column.getIsVisible())}
                  >
                    <input type="checkbox" className="mr-2" checked={column.getIsVisible()} onChange={() => {}} />
                    {column.id === "title"
                      ? "Article"
                      : column.id === "author"
                        ? "Auteur"
                        : column.id === "publishedAt"
                          ? "Date de publication"
                          : column.id === "tags"
                            ? "Tags"
                            : column.id === "status"
                              ? "Statut"
                              : column.id}
                  </DropdownMenuItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
                  Aucun résultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
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

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement l&apos;article
              {postToDelete && <span className="font-bold"> {postToDelete.title}</span>} de notre base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePost} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
