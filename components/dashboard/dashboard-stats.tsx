import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, CreditCard, Package, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function DashboardStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenu total</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">€45,231.89</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +20.1%
            </span>
            <span>par rapport au mois dernier</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nouveaux clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2,350</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +18.2%
            </span>
            <span>par rapport au mois dernier</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Commandes</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center text-emerald-500">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.2%
            </span>
            <span>par rapport au mois dernier</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taux de conversion</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2.4%</div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span className="flex items-center text-rose-500">
              <ArrowDownRight className="mr-1 h-3 w-3" />
              -0.1%
            </span>
            <span>par rapport au mois dernier</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
