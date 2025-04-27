import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { CalendarIcon, UploadCloud } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { useCreateEvent } from "@/hooks/useEvent"
import { eventFormSchema } from "@/schemas/eventSchema"


export function EventCreateForm({
  onSuccess,
}: {
  onSuccess: () => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  // Utiliser le hook useCreateEvent
  const { mutateAsync } = useCreateEvent()

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      organizer: "",
      status: "upcoming",
      category: "",
      time: "",
      price: 0,
      capacity: 100,
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        form.setValue("image", file)
        setPreview(URL.createObjectURL(file))
      }
    },
  })

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    setIsLoading(true);


    const eventData = {
      ...values,
      image: values.image,  // Image convertie en base64 ou URL, qui sera undefined si pas de fichier
    };

    try {
      console.log("Création de l'évènement:", eventData);

      await mutateAsync(eventData);

      toast("Évènement créé avec succès", {
        description: `${values.title} a été ajouté.`,
      });

      onSuccess();
    } catch (error) {
      toast.error("Une erreur s'est produite", {
        description: "Impossible de créer l'évènement."
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Formulaire */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Titre */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Conférence Tech" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description de l'évènement" {...field} rows={3} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de l&apos;évènement</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        {field.value ? format(field.value, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Heure */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Heure</FormLabel>
                <FormControl>
                  <Input placeholder="14:00" {...field} type="time" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Lieu */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu</FormLabel>
                <FormControl>
                  <Input placeholder="Paris Expo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Organisateur */}
          <FormField
            control={form.control}
            name="organizer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organisateur</FormLabel>
                <FormControl>
                  <Input placeholder="TechEvents" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Catégorie */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <FormControl>
                  <Input placeholder="Conférence, Atelier, Festival..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Prix */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix (en FCFA)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Capacité */}
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacité</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Statut */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="upcoming">À venir</SelectItem>
                    <SelectItem value="ongoing">En cours</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                    <SelectItem value="cancelled">Annulé</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Image Upload */}
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <div {...getRootProps()} className="border-dashed border-2 rounded-lg p-6 text-center cursor-pointer">
                <input {...getInputProps()} />
                {preview ? (
                  <Image src={preview} alt="Preview" width={200} height={200} className="mx-auto rounded-md object-cover" />
                ) : (
                  <div className="flex flex-col items-center space-y-2 text-gray-500">
                    <UploadCloud className="h-10 w-10" />
                    <p>Glissez une image ici ou cliquez pour sélectionner</p>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Boutons */}
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onSuccess} disabled={isLoading}>
            Annuler
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Création en cours..." : "Créer l'évènement"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
