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
import type { Vendor } from "@/types/vendor"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface VendorsListProps {
  onEdit: (vendor: Vendor) => void
}

const dummyVendors: Vendor[] = [
  {
    id: "1",
    name: "TechStore",
    description: "Vente de produits électroniques et accessoires",
    logo: "/placeholder.svg?height=40&width=40",
    email: "contact@techstore.com",
    phone: "+33 1 23 45 67 89",
    address: "15 rue de la Technologie, 75001 Paris",
    website: "https://techstore.com",
    status: "active",
    createdAt: new Date("2022-03-15"),
  },
  {
    id: "2",
    name: "FashionStyle",
    description: "Boutique de vêtements et accessoires de mode",
    logo: "/placeholder.svg?height=40&width=40",
    email: "info@fashionstyle.com",
    phone: "+33 1 34 56 78 90",
    address: "25 avenue de la Mode, 75008 Paris",
    website: "https://fashionstyle.com",
    status: "active",
    createdAt: new Date("2022-05-20"),
  },
  {
    id: "3",
    name: "GourmetDelices",
    description: "Produits alimentaires de qualité supérieure",
    logo: "/placeholder.svg?height=40&width=40",
    email: "contact@gourmetdelices.com",
    phone: "+33 1 45 67 89 01",
    address: "8 rue de la Gastronomie, 75006 Paris",
    website: "https://gourmetdelices.com",
    status: "inactive",
    createdAt: new Date("2022-02-10"),
  },
  {
    id: "4",
    name: "HomeDeco",
    description: "Articles de décoration pour la maison",
    logo: "/placeholder.svg?height=40&width=40",
    email: "info@homedeco.com",
    phone: "+33 1 56 78 90 12",
    address: "32 boulevard des Arts, 75011 Paris",
    website: "https://homedeco.com",
    status: "active",
    createdAt: new Date("2022-07-05"),
  },
  {
    id: "5",
    name: "SportsPlus",
    description: "Équipements et vêtements de sport",
    logo: "/placeholder.svg?height=40&width=40",
    email: "contact@sportsplus.com",
    phone: "+33 1 67 89 01 23",
    address: "47 avenue des Sports, 75016 Paris",
    website: "https://sportsplus.com",
    status: "pending",
    createdAt: new Date("2022-09-18"),
  },
]

export function VendorsList({ onEdit }: VendorsListProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [vendorToDelete, setVendorToDelete] = useState<Vendor | null>(null)

  const statusColorMap = {
    active: "bg-emerald-500 hover:bg-emerald-600",
    inactive: "bg-rose-500 hover:bg-rose-600",
    pending: "bg-amber-500 hover:bg-amber-600",
  }

  const statusLabels = {
    active: "Actif",
    inactive: "Inactif",
    pending: "En attente",
  }

  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "Vendeur",
      cell: ({ row }) => {
        const vendor = row.original
        return (
          <div className="flex items-center space-x-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={vendor.logo || "/placeholder.svg?height=40&width=40"}
                alt={vendor.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div className="font-medium">{vendor.name}</div>
              <div className="text-sm text-muted-foreground line-clamp-1">{vendor.description}</div>
            </div>
          </div>
        )
      },
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
      accessorKey: "website",
      header: "Site web",
      cell: ({ row }) => {
        const website = row.getValue("website") as string
        return website ? (
          <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {website.replace(/(^\w+:|^)\/\//, "")}
          </a>
        ) : (
          <span className="text-muted-foreground">-</span>
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
      accessorKey: "createdAt",
      header: "Date d'inscription",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as Date
        return <div>{date.toLocaleDateString("fr-FR")}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const vendor = row.original
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
              <DropdownMenuItem onClick={() => onEdit(vendor)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setVendorToDelete(vendor)
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
    data: dummyVendors,
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

  const handleDeleteVendor = () => {
    // Dans une application réelle, vous appelleriez une API ici
    console.log(`Suppression du vendeur : ${vendorToDelete?.id}`)
    setDeleteConfirmOpen(false)
    setVendorToDelete(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par nom..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
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
                    {column.id === "name"
                      ? "Vendeur"
                      : column.id === "email"
                        ? "Email"
                        : column.id === "phone"
                          ? "Téléphone"
                          : column.id === "website"
                            ? "Site web"
                            : column.id === "status"
                              ? "Statut"
                              : column.id === "createdAt"
                                ? "Date d'inscription"
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

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous absolument sûr?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement le vendeur
              {vendorToDelete && <span className="font-bold"> {vendorToDelete.name}</span>} de notre base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteVendor} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
