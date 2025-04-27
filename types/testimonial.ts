export interface Testimonial {
  id: string
  author: {
    name: string
    role?: string
    avatar?: string
  }
  content: string
  rating: number
  createdAt: Date
  status: "approved" | "pending" | "rejected"
}
