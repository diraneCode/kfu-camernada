import { Banknote, Calendar, type LucideIcon, Package, TrendingDown, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CardStatsProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
  icon: string
  className?: string
}

export function CardStats({ title, value, change, trend, description, icon, className }: CardStatsProps) {
  const getIcon = (): LucideIcon => {
    switch (icon) {
      case "users":
        return Users
      case "package":
        return Package
      case "calendar":
        return Calendar
      case "banknote":
        return Banknote
      default:
        return Users
    }
  }

  const Icon = getIcon()

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1 text-xs">
          {trend === "up" ? (
            <TrendingUp className="mr-1 h-3 w-3 text-emerald-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-rose-500" />
          )}
          <span className={trend === "up" ? "text-emerald-500" : "text-rose-500"}>{change}</span>
          <span className="pl-1 text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
