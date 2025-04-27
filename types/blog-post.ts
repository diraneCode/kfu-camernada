export interface BlogPost {
  id?: string
  title?: string
  content?: string
  category?: string
  slug?: string
  excerpt?: string
  author?: string
  coverImage?: string
  image?: string
  publishedAt?: string
  createdAt?: Date
  status?: "draft" | "published" | "archived"
  tags?: string[]
}
