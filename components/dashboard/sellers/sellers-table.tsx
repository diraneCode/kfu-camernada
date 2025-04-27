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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Seller } from "@/types/seller"

// Données simulées
const data: Seller[] = [
  {
    id: "1",
    name: "Entreprise Durand",
    email: "contact@durand.com",
    phone: "+33 1 23 45 67 89",
    company: "Durand & Fils",
    status: "active",
    joinedAt: "2022-03-15T09:24:00",
    productsCount: 42,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    name: "Société Martin",
    email: "info@martin-company.com",
    phone: "+33 1 98 76 54 32",
    company: "Martin Company",
    status: "active",
    joinedAt: "2022-05-20T14:35:00",
    productsCount: 28,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    name: "Artisanat Petit",
    email: "contact@artisanat-petit.fr",
    phone: "+33 6 12 34 56 78",
    company: "Artisanat Petit",
    status: "inactive",
    joinedAt: "2022-01-10T11:15:00",
    productsCount: 15,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    name: "Tech Solutions",
    email: "support@techsolutions.com",
    phone: "+33 1 45 67 89 01",
    company: "Tech Solutions SAS",
    status: "active",
    joinedAt: "2022-07-05T16:42:00",
    productsCount: 67,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    name: "Mobilier Design",
    email: "contact@mobilier-design.com",
    phone: "+33 6 98 76 54 32",
    company: "Mobilier Design SARL",
    status: "pending",
    joinedAt: "2022-09-18T08:30:00",
    productsCount: 31,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "6",
    name: "Électronique Plus",
    email: "ventes@electronique-plus.fr",
    phone: "+33 1 23 45 67 89",
    company: "Électronique Plus",
    status: "active",
    joinedAt: "2022-11-22T13:20:00",
    productsCount: 54,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "7",
    name: "Mode Élégante",
    email: "contact@mode-elegante.com",
    phone: "+33 6 12 34 56 78",
    company: "Mode Élégante",
    status: "inactive",
    joinedAt: "2022-02-14T10:05:00",
    productsCount: 23,
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "8",
    name: "Alimentation Bio",
    email: "info@alimentation-bio.fr",
    phone: "+33 1 98 76 54 32",
    company: "Alimentation Bio SARL",
    status: "active",
    joinedAt: "2022-04-30T15:50:00",
    productsCount: 47,
    avatar: "/placeholder-user.jpg",
  },
]

interface SellersTableProps {
  searchQuery: string
  onEdit: (seller: Seller) => void
}

export function SellersTable({ searchQuery, onEdit }: SellersTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [deleteSellerId, setDeleteSellerId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const columns: ColumnDef<Seller>[] = [
    {
      accessorKey: "name",
      header: "Nom",
      cell: ({ row }) => {
        const seller = row.original
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={seller.avatar || "/placeholder.svg"} alt={seller.name} />
              <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="font-medium">{seller.name}</div>
          </div>
        )
      },
    },
    {
      accessorKey: "company",
      header: "Entreprise",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Téléphone",
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "active" ? "success" : status === "inactive" ? "destructive" : "outline"}
            className="capitalize"
          >
            {status === "active" ? "Actif" : status === "inactive" ? "Inactif" : "En attente"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "productsCount",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Produits
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return <div>{row.getValue("productsCount")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const seller = row.original
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
              <DropdownMenuItem onClick={() => onEdit(seller)}>Modifier</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  setDeleteSellerId(seller.id)
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
    (seller) =>
      seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.phone.includes(searchQuery),
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

  const handleDeleteSeller = () => {
    // Ici, vous implémenteriez la logique de suppression réelle
    console.log(`Suppression du vendeur avec l'ID: ${deleteSellerId}`)
    setIsDeleteDialogOpen(false)
    setDeleteSellerId(null)
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
          {table.getFilteredRowModel().rows.length} vendeur(s) au total
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
              Cette action ne peut pas être annulée. Cela supprimera définitivement le vendeur et toutes les données
              associées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSeller}
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
