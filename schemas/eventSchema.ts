import { z } from "zod";

export const eventFormSchema = z.object({
    title: z.string().min(2, { message: "Le titre doit contenir au moins 2 caractères." }),
    description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères." }),
    date: z.date({ required_error: "La date est requise." }),
    time: z.string().min(1, { message: "L'heure est requise." }),
    location: z.string().min(2, { message: "Le lieu doit contenir au moins 2 caractères." }),
    category: z.string().min(2, { message: "La catégorie est requise." }),
    price: z.coerce.number().nonnegative({ message: "Le prix doit être positif ou nul." }),
    image: z
      .instanceof(File)
      .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
        message: "La photo ne doit pas dépasser 5MB",
      }),
    organizer: z.string().min(2, { message: "L'organisateur doit contenir au moins 2 caractères." }),
    status: z.enum(["upcoming", "ongoing", "completed", "cancelled"], { required_error: "Veuillez sélectionner un statut." }),
    capacity: z.coerce.number().int().positive({ message: "La capacité doit être un nombre positif." }),
  })