export interface Vendor {
  id: string
  name: string
  description: string
  logo?: string
  email: string
  phone: string
  address: string
  website?: string
  status: "active" | "inactive" | "pending"
  createdAt: Date
}
