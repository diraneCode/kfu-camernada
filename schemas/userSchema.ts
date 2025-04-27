import { z } from "zod"

// Schéma pour l'étape 1 : Informations personnelles
export const personalInfoSchema = z.object({
  nom: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  prenom: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Email invalide" }),
  password: z
    .string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
  telephone: z.string().min(10, { message: "Numéro de téléphone invalide" }),
})

// Schéma pour l'étape 2 : Localisation
export const locationSchema = z.object({
  pays: z.string().min(2, { message: "Veuillez sélectionner un pays" }),
  ville: z.string().min(2, { message: "Veuillez entrer une ville" }),
})

// Schéma pour l'étape 3 : Réseaux sociaux
export const socialMediaSchema = z.object({
  facebookUrl: z.string().url({ message: "URL Facebook invalide" }).or(z.string().length(0)),
  instagramUrl: z.string().url({ message: "URL Instagram invalide" }).or(z.string().length(0)),
  snapchatUrl: z.string().url({ message: "URL Snapchat invalide" }).or(z.string().length(0)),
})

// Schéma pour l'étape 4 : Informations professionnelles
export const professionalInfoSchema = z.object({
  job: z.string().min(2, { message: "Veuillez entrer votre profession" }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
})

// Schéma pour l'étape 5 : Avatar
export const avatarSchema = z.object({
  avatar_url: z
  .instanceof(File)
  .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
    message: "La photo ne doit pas dépasser 5MB",
  }),
})

// Schéma complet du formulaire
export const registrationFormSchema = personalInfoSchema
  .merge(locationSchema)
  .merge(socialMediaSchema)
  .merge(professionalInfoSchema)
  .merge(avatarSchema)

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>
