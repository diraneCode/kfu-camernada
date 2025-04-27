export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  id: string
  customer: {
    id: string
    name: string
    email: string
  }
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "processing" | "completed" | "cancelled" | "refunded"
  paymentMethod: "card" | "paypal" | "bank_transfer" | "cash"
  createdAt: Date
  shippingAddress?: string
}
