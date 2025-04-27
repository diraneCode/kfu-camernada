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
import { TUser } from "@/types/user"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { shaowDateFormat } from "@/app/mon-compte/page"

interface UsersListProps {
  data: TUser[]
  onEdit: (user: TUser) => void
}

// const dummyUsers: User[] = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john.doe@example.com",
//     role: "admin",
//     avatar: "/placeholder.svg?height=40&width=40",
//     phone: "+33 6 12 34 56 78",
//     createdAt: new Date("2022-01-15"),
//     status: "active",
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane.smith@example.com",
//     role: "user",
//     avatar: "/placeholder.svg?height=40&width=40",
//     phone: "+33 6 23 45 67 89",
//     createdAt: new Date("2022-03-10"),
//     status: "active",
//   },
//   {
//     id: "3",
//     name: "Alex Johnson",
//     email: "alex.johnson@example.com",
//     role: "moderator",
//     avatar: "/placeholder.svg?height=40&width=40",
//     phone: "+33 6 34 56 78 90",
//     createdAt: new Date("2022-06-22"),
//     status: "inactive",
//   },
//   {
//     id: "4",
//     name: "Marie Dupont",
//     email: "marie.dupont@example.com",
//     role: "user",
//     avatar: "/placeholder.svg?height=40&width=40",
//     phone: "+33 6 45 67 89 01",
//     createdAt: new Date("2022-08-05"),
//     status: "active",
//   },
//   {
//     id: "5",
//     name: "Pierre Martin",
//     email: "pierre.martin@example.com",
//     role: "user",
//     avatar: "/placeholder.svg?height=40&width=40",
//     phone: "+33 6 56 78 90 12",
//     createdAt: new Date("2022-09-18"),
//     status: "pending",
//   },
//   {
//     id: "6",
//     name: "Sophie Petit",
//     email: "sophie.petit@example.com",
//     role: "moderator",
//     avatar: "/placeholder.svg?height=40&width=40",
//     phone: "+33 6 67 89 01 23",
//     createdAt: new Date("2022-11-30"),
//     status: "active",
//   },
// ]

export function UsersList({ data, onEdit }: UsersListProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<TUser | null>(null)

  const roleColorMap = {
    admin: "bg-red-500",
    moderator: "bg-amber-500",
    user: "bg-emerald-500",
  }

  const statusColorMap = {
    active: "bg-emerald-500 hover:bg-emerald-600",
    inactive: "bg-rose-500 hover:bg-rose-600",
    pending: "bg-amber-500 hover:bg-amber-600",
  }

  const columns: ColumnDef<TUser>[] = [
    {
      accessorKey: "nom",
      header: "Nom",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex items-center space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar_url || ""} alt={user.nom} />
              <AvatarFallback>
                {user.nom
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.nom}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "job",
      header: "Rôle",
      cell: ({ row }) => {
        const role = row.getValue("job") as string
        return (
          <Badge
            variant="outline"
            className={`font-medium ${roleColorMap[role as keyof typeof roleColorMap]} text-white`}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
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
          <Badge className={statusColorMap[status as keyof typeof statusColorMap]}>
            {status === "active" ? "Actif" : status === "inactive" ? "Inactif" : "En attente"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "telephone",
      header: "Téléphone",
    },
    {
      accessorKey: "created_at",
      header: "Date d'inscription",
      cell: ({ row }) => {
        const date = row.getValue("created_at") as Date
        return <div>{shaowDateFormat(date.toString())}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original
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
              <DropdownMenuItem onClick={() => onEdit(user)}>
                <Edit className="mr-2 h-4 w-4" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setUserToDelete(user)
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

  const handleDeleteUser = () => {
    // Dans une application réelle, vous appelleriez une API ici
    console.log(`Suppression de l'utilisateur : ${userToDelete?.id}`)
    setDeleteConfirmOpen(false)
    setUserToDelete(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par nom..."
          value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("nom")?.setFilterValue(event.target.value)}
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
                      ? "Nom"
                      : column.id === "role"
                        ? "Rôle"
                        : column.id === "status"
                          ? "Statut"
                          : column.id === "phone"
                            ? "Téléphone"
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
          {table.getFilteredRowModel().rows.length} utilisateur(s) au total
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
              Cette action ne peut pas être annulée. Cela supprimera définitivement l&apos;utilisateur
              {userToDelete && <span className="font-bold"> {userToDelete.nom}</span>} de notre base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
