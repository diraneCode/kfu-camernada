import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const recentUsers = [
  {
    id: "1",
    name: "Marie Dubois",
    email: "marie.d@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MD",
    timestamp: "Il y a 2 heures",
  },
  {
    id: "2",
    name: "Alex Martin",
    email: "alex.m@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AM",
    timestamp: "Il y a 3 heures",
  },
  {
    id: "3",
    name: "Sophie Petit",
    email: "sophie.p@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SP",
    timestamp: "Il y a 5 heures",
  },
  {
    id: "4",
    name: "Thomas Blanc",
    email: "thomas.b@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "TB",
    timestamp: "Il y a 6 heures",
  },
]

export function RecentUsers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Utilisateurs récents</CardTitle>
        <CardDescription>{recentUsers.length} utilisateurs inscrits récemment.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="text-xs text-muted-foreground">{user.timestamp}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
