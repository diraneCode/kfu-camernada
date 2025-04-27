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
import { IEvent } from "@/types/event"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { shaowDateFormat } from "@/app/mon-compte/page"

interface EventsListProps {
  data: IEvent[]
  onEdit: (event: IEvent) => void
}

export function EventsList({ data, onEdit }: EventsListProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [eventToDelete, setEventToDelete] = useState<IEvent | null>(null)

  const statusColorMap = {
    upcoming: "bg-blue-500 hover:bg-blue-600",
    ongoing: "bg-emerald-500 hover:bg-emerald-600",
    completed: "bg-gray-500 hover:bg-gray-600",
    cancelled: "bg-rose-500 hover:bg-rose-600",
  }

  const statusLabels = {
    upcoming: "À venir",
    ongoing: "En cours",
    completed: "Terminé",
    cancelled: "Annulé",
  }

  const columns: ColumnDef<IEvent>[] = [
    {
      accessorKey: "title",
      header: "Évènement",
      cell: ({ row }) => {
        const event = row.original
        return (
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded">
              <Image
                src={event.image || "/placeholder.svg?height=40&width=40"}
                alt={event.title}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-muted-foreground line-clamp-1">{event.description}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as Date
        return <div>{shaowDateFormat(date.toString())}</div>
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
          <Badge className={statusColorMap[status as keyof typeof statusColorMap]}>
            {statusLabels[status as keyof typeof statusLabels]}
          </Badge>
        )
      },
    },
    {
      accessorKey: "capacity",
      header: "Capacité",
    },
    {
      accessorKey: "organizer",
      header: "Organisateur",
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
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(event)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEventToDelete(event)
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
    data: data,
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

  const handleDeleteEvent = () => {
    // Dans une application réelle, vous appelleriez une API ici
    console.log(`Suppression de l'évènement : ${eventToDelete?.id}`)
    setDeleteConfirmOpen(false)
    setEventToDelete(null)
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
                      ? "Évènement"
                      : column.id === "date"
                        ? "Date"
                        : column.id === "location"
                          ? "Lieu"
                          : column.id === "status"
                            ? "Statut"
                            : column.id === "capacity"
                              ? "Capacité"
                              : column.id === "organizer"
                                ? "Organisateur"
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
          {table.getFilteredRowModel().rows.length} évènement(s) au total
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
              Cette action ne peut pas être annulée. Cela supprimera définitivement l&apos;évènement
              {eventToDelete && <span className="font-bold"> {eventToDelete.title}</span>} de notre base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteEvent} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
