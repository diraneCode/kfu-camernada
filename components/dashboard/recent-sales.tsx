import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      {[
        {
          name: "Olivia Martin",
          email: "olivia.martin@email.com",
          amount: "€1,999.00",
          image: "/placeholder-user.jpg",
          initials: "OM",
        },
        {
          name: "Jackson Lee",
          email: "jackson.lee@email.com",
          amount: "€39.00",
          image: "/placeholder-user.jpg",
          initials: "JL",
        },
        {
          name: "Isabella Nguyen",
          email: "isabella.nguyen@email.com",
          amount: "€299.00",
          image: "/placeholder-user.jpg",
          initials: "IN",
        },
        {
          name: "William Kim",
          email: "will@email.com",
          amount: "€99.00",
          image: "/placeholder-user.jpg",
          initials: "WK",
        },
        {
          name: "Sofia Davis",
          email: "sofia.davis@email.com",
          amount: "€39.00",
          image: "/placeholder-user.jpg",
          initials: "SD",
        },
      ].map((sale, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.image || "/placeholder.svg"} alt={sale.name} />
            <AvatarFallback>{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}
