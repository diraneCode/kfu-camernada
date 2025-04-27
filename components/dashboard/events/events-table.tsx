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
import type { Event } from "@/types/event"

// Données simulées
const data: Event[] = [
  {
    id: "1",
    title: "Conférence Tech 2023",
    description: "Une conférence sur les dernières technologies",
    date: "2023-12-15T09:00:00",
    location: "Paris, France",
    status: "upcoming",
    organizer: "TechEvents",
    capacity: 500,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "2",
    title: "Festival de Musique",
    description: "Un festival de musique en plein air",
    date: "2023-07-20T14:00:00",
    location: "Lyon, France",
    status: "completed",
    organizer: "MusicFest",
    capacity: 2000,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "3",
    title: "Salon du Livre",
    description: "Rencontrez vos auteurs préférés",
    date: "2023-09-10T10:00:00",
    location: "Bordeaux, France",
    status: "completed",
    organizer: "BookLovers",
    capacity: 800,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "4",
    title: "Exposition d'Art Moderne",
    description: "Découvrez les œuvres d'artistes contemporains",
    date: "2024-02-05T11:00:00",
    location: "Marseille, France",
    status: "upcoming",
    organizer: "ArtGallery",
    capacity: 300,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "5",
    title: "Marathon de Paris",
    description: "Course annuelle à travers la ville",
    date: "2024-04-12T08:00:00",
    location: "Paris, France",
    status: "upcoming",
    organizer: "RunParis",
    capacity: 5000,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "6",
    title: "Salon de l'Agriculture",
    description: "Découvrez le monde agricole",
    date: "2024-03-01T09:00:00",
    location: "Paris, France",
    status: "upcoming",
    organizer: "AgriWorld",
    capacity: 10000,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "7",
    title: "Foire aux Vins",
    description: "Dégustation des meilleurs vins",
    date: "2023-11-15T16:00:00",
    location: "Strasbourg, France",
    status: "completed",
    organizer: "WineTasting",
    capacity: 600,
    image: "/placeholder.svg?height=100&width=200",
  },
  {
    id: "8",
    title: "Conférence sur l'IA",
    description: "Les dernières avancées en intelligence artificielle",
    date: "2024-01-20T10:00:00",
    location: "Toulouse, France",
    status: "cancelled",
    organizer: "AITech",
    capacity: 400,
    image: "/placeholder.svg?height=100&width=200",
  },
]

interface EventsTableProps {
  searchQuery: string
  onEdit: (event: Event) => void
}

export function EventsTable({ searchQuery, onEdit }: EventsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: "title",
      header: "Titre",
      cell: ({ row }) => {
        const event = row.original
        return (
          <div className="flex items-center gap-3">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="h-10 w-16 rounded object-cover" />
            <div className="font-medium">{event.title}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("date") as string)
        return <div>{date.toLocaleDateString("fr-FR")}</div>
      },
    },
    {
      accessorKey: "location",
      header: "Lieu",
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "upcoming" ? "outline" : status === "completed" ? "success" : "destructive"}
            className="capitalize"
          >
            {status === "upcoming" ? "À venir" : status === "completed" ? "Terminé" : "Annulé"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "capacity",
      header: "Capacité",
      cell: ({ row }) => {
        return <div>{row.getValue("capacity")} personnes</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const event = row.original
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
              <DropdownMenuItem onClick={() => onEdit(event)}>Modifier</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  setDeleteEventId(event.id)
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
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()),
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

  const handleDeleteEvent = () => {
    // Ici, vous implémenteriez la logique de suppression réelle
    console.log(`Suppression de l'événement avec l'ID: ${deleteEventId}`)
    setIsDeleteDialogOpen(false)
    setDeleteEventId(null)
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
          {table.getFilteredRowModel().rows.length} événement(s) au total
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
              Cette action ne peut pas être annulée. Cela supprimera définitivement l'événement et toutes les données
              associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvent}
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
