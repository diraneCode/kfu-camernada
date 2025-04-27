export type TUser = {
  id?: string
  user_id?: string
  nom: string
  prenom: string
  email: string
  password: string
  telephone: string
  pays: string
  ville: string
  facebookUrl: string
  instagramUrl: string
  snapchatUrl: string
  job: string
  description: string
  events?: TEvent[]
  gallery?: TGallery[]
  avatar_url: string
  created_at?: string
}

export type TGallery = {
  image: string
} 

export type TEvent = {
  id: string
  image: string
  title: string
  date: string
  location: string
}