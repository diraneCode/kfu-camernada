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
import type { Order } from "@/types/order"

// Données simulées
const data: Order[] = [
  {
    id: "ORD-001",
    customerName: "Jean Dupont",
    customerEmail: "jean.dupont@example.com",
    status: "completed",
    total: 129.99,
    items: [
      { id: "1", name: "Écouteurs sans fil", price: 79.99, quantity: 1 },
      { id: "2", name: "Étui de protection", price: 25.0, quantity: 2 },
    ],
    createdAt: "2023-01-15T09:24:00",
    paymentMethod: "Carte de crédit",
    shippingAddress: "123 Rue de Paris, 75001 Paris, France",
  },
  {
    id: "ORD-002",
    customerName: "Marie Martin",
    customerEmail: "marie.martin@example.com",
    status: "processing",
    total: 349.95,
    items: [{ id: "3", name: "Smartphone", price: 349.95, quantity: 1 }],
    createdAt: "2023-02-20T14:35:00",
    paymentMethod: "PayPal",
    shippingAddress: "45 Avenue des Champs-Élysées, 75008 Paris, France",
  },
  {
    id: "ORD-003",
    customerName: "Pierre Durand",
    customerEmail: "pierre.durand@example.com",
    status: "pending",
    total: 59.97,
    items: [{ id: "4", name: "T-shirt", price: 19.99, quantity: 3 }],
    createdAt: "2023-03-10T11:15:00",
    paymentMethod: "Carte de crédit",
    shippingAddress: "78 Rue de Lyon, 69006 Lyon, France",
  },
  {
    id: "ORD-004",
    customerName: "Sophie Lefebvre",
    customerEmail: "sophie.lefebvre@example.com",
    status: "completed",
    total: 199.99,
    items: [{ id: "5", name: "Montre connectée", price: 199.99, quantity: 1 }],
    createdAt: "2023-04-05T16:42:00",
    paymentMethod: "Virement bancaire",
    shippingAddress: "12 Rue du Vieux Port, 13002 Marseille, France",
  },
  {
    id: "ORD-005",
    customerName: "Thomas Bernard",
    customerEmail: "thomas.bernard@example.com",
    status: "cancelled",
    total: 89.98,
    items: [
      { id: "6", name: "Livre", price: 24.99, quantity: 2 },
      { id: "7", name: "Stylo de luxe", price: 39.99, quantity: 1 },
    ],
    createdAt: "2023-05-18T08:30:00",
    paymentMethod: "Carte de crédit",
    shippingAddress: "34 Rue de la Liberté, 59000 Lille, France",
  },
  {
    id: "ORD-006",
    customerName: "Julie Petit",
    customerEmail: "julie.petit@example.com",
    status: "completed",
    total: 499.99,
    items: [{ id: "8", name: "Tablette", price: 499.99, quantity: 1 }],
    createdAt: "2023-06-22T13:20:00",
    paymentMethod: "Carte de crédit",
    shippingAddress: "56 Boulevard Victor Hugo, 44000 Nantes, France",
  },
  {
    id: "ORD-007",
    customerName: "Nicolas Robert",
    customerEmail: "nicolas.robert@example.com",
    status: "processing",
    total: 149.97,
    items: [{ id: "9", name: "Casque audio", price: 149.97, quantity: 1 }],
    createdAt: "2023-07-14T10:05:00",
    paymentMethod: "PayPal",
    shippingAddress: "23 Rue des Carmes, 31000 Toulouse, France",
  },
  {
    id: "ORD-008",
    customerName: "Camille Richard",
    customerEmail: "camille.richard@example.com",
    status: "completed",
    total: 79.96,
    items: [{ id: "10", name: "Jeu de société", price: 39.98, quantity: 2 }],
    createdAt: "2023-08-30T15:50:00",
    paymentMethod: "Carte de crédit",
    shippingAddress: "67 Rue de la République, 67000 Strasbourg, France",
  },
]

interface OrdersTableProps {
  searchQuery: string
  statusFilter: string
  onEdit: (order: Order) => void
}

export function OrdersTable({ searchQuery, statusFilter, onEdit }: OrdersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Commande",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("id")}</div>
      },
    },
    {
      accessorKey: "customerName",
      header: "Client",
      cell: ({ row }) => {
        const order = row.original
        return (
          <div>
            <div className="font-medium">{order.customerName}</div>
            <div className="text-xs text-muted-foreground">{order.customerEmail}</div>
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
          <Badge
            variant={
              status === "completed"
                ? "success"
                : status === "processing"
                  ? "outline"
                  : status === "pending"
                    ? "secondary"
                    : "destructive"
            }
            className="capitalize"
          >
            {status === "completed"
              ? "Complétée"
              : status === "processing"
                ? "En traitement"
                : status === "pending"
                  ? "En attente"
                  : "Annulée"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("total"))
        const formatted = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: "EUR",
        }).format(amount)
        return <div className="font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt") as string)
        return <div>{date.toLocaleDateString("fr-FR")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const order = row.original
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
              <DropdownMenuItem onClick={() => onEdit(order)}>Voir les détails</DropdownMenuItem>
              <DropdownMenuItem>Imprimer la facture</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  setDeleteOrderId(order.id)
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

  // Filtrer les données en fonction de la recherche et du statut
  const filteredData = data.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

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

  const handleDeleteOrder = () => {
    // Ici, vous implémenteriez la logique de suppression réelle
    console.log(`Suppression de la commande avec l'ID: ${deleteOrderId}`)
    setIsDeleteDialogOpen(false)
    setDeleteOrderId(null)
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
          {table.getFilteredRowModel().rows.length} commande(s) au total
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
              Cette action ne peut pas être annulée. Cela supprimera définitivement la commande et toutes les données
              associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOrder}
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
