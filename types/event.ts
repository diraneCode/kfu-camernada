export interface IEvent {
  id?: string
  title: string
  description: string
  date: Date
  time: string
  location: string
  category: string
  price: number
  image: string
  organizer: string
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  capacity: number
  createdAt?: Date
}
