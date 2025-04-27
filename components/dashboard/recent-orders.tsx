import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

const recentOrders = [
  {
    id: "ORD-001",
    customer: "Jean Dupont",
    amount: "€89.99",
    status: "completed",
    timestamp: "Il y a 30 minutes",
  },
  {
    id: "ORD-002",
    customer: "Laure Blanc",
    amount: "€129.00",
    status: "processing",
    timestamp: "Il y a 2 heures",
  },
  {
    id: "ORD-003",
    customer: "Michel Martin",
    amount: "€45.50",
    status: "pending",
    timestamp: "Il y a 3 heures",
  },
  {
    id: "ORD-004",
    customer: "Claire Tremblay",
    amount: "€239.99",
    status: "completed",
    timestamp: "Il y a 5 heures",
  },
]

const statusStyles = {
  completed: "bg-emerald-500 hover:bg-emerald-600",
  processing: "bg-amber-500 hover:bg-amber-600",
  pending: "bg-blue-500 hover:bg-blue-600",
  cancelled: "bg-rose-500 hover:bg-rose-600",
}

const statusLabels = {
  completed: "Complétée",
  processing: "En traitement",
  pending: "En attente",
  cancelled: "Annulée",
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Commandes récentes</CardTitle>
        <CardDescription>{recentOrders.length} commandes placées récemment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between space-y-0">
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{order.customer}</p>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs text-muted-foreground cursor-help">{order.id}</p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>ID de commande: {order.id}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium">{order.amount}</p>
                <Badge className={statusStyles[order.status as keyof typeof statusStyles]}>
                  {statusLabels[order.status as keyof typeof statusLabels]}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
