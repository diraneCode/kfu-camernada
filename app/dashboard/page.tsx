import { CardSalesAnalytics } from "@/components/dashboard/card-sales-analytics"
import { CardStats } from "@/components/dashboard/card-stats"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { RecentUsers } from "@/components/dashboard/recent-users"
import { Separator } from "@/components/ui/separator"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d&apos;ensemble de votre activité et des statistiques récentes.</p>
      </div>
      <Separator />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CardStats
          title="Total utilisateurs"
          value="3,587"
          change="+12.5%"
          trend="up"
          description="vs. mois dernier"
          icon="users"
        />
        <CardStats
          title="Commandes"
          value="2,345"
          change="+7.2%"
          trend="up"
          description="vs. mois dernier"
          icon="package"
        />
        <CardStats
          title="Évènements"
          value="45"
          change="+2.3%"
          trend="up"
          description="vs. mois dernier"
          icon="calendar"
        />
        <CardStats
          title="Revenu"
          value="€124,892"
          change="-3.1%"
          trend="down"
          description="vs. mois dernier"
          icon="banknote"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <CardSalesAnalytics className="lg:col-span-4" />
        <div className="space-y-6 lg:col-span-3">
          <RecentUsers />
          <RecentOrders />
        </div>
      </div>
    </div>
  )
}
