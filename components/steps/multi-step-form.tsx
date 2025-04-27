"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/steps/file-upload"
import { useRouter } from "next/navigation"
import {
  registrationFormSchema,
  personalInfoSchema,
  locationSchema,
  socialMediaSchema,
  professionalInfoSchema,
  avatarSchema,
  type RegistrationFormValues,
} from "@/schemas/userSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useCreateUser } from "@/hooks/useUsers"
import { toast } from "sonner"

const steps = [
  { name: "Informations personnelles", schema: personalInfoSchema },
  { name: "Localisation", schema: locationSchema },
  { name: "Réseaux sociaux", schema: socialMediaSchema },
  { name: "Informations professionnelles", schema: professionalInfoSchema },
  { name: "Avatar", schema: avatarSchema },
]

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { mutateAsync: createUserMutation } = useCreateUser();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      telephone: "",
      pays: "",
      ville: "",
      facebookUrl: "",
      instagramUrl: "",
      snapchatUrl: "",
      job: "",
      description: "",
    },
    mode: "onChange",
  })

  const nextStep = async () => {
    const fields = Object.keys(steps[currentStep].schema.shape)

    const isValid = await form.trigger(fields as any)

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    const userData = {
      ...data,
      avatar_url: data.avatar_url,
    };

    try {
      const result = await createUserMutation(userData); // utilise mutateAsync
      if (result.success) {
        console.log("Utilisateur créé avec succès :", result);
        router.push("/registration-success");
      } else {
        console.error("Erreur de création utilisateur :", result.error);
        toast.error(`Erreur lors de la création : ${result.error}`);
      }
    } catch (error) {
      console.error("Erreur inattendue dans onSubmit :", error);
      toast.error(`Erreur inattendue : ${(error as Error).message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFields = Object.keys(steps[currentStep].schema.shape)

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Indicateur de progression */}
      <div className="px-8 pt-8">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.name} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold",
                  currentStep === index
                    ? "border-red-600 text-red-600"
                    : currentStep > index
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 text-gray-300",
                )}
              >
                {currentStep > index ? <Check className="h-5 w-5" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 font-medium",
                  currentStep === index ? "text-red-600" : currentStep > index ? "text-green-500" : "text-gray-400",
                )}
              >
                {step.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{steps[currentStep].name}</h2>

              {/* Étape 1: Informations personnelles */}
              {currentStep === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mot de passe</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="+33 6 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Étape 2: Localisation */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="pays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre pays" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ville"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre ville" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Étape 3: Réseaux sociaux */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="facebookUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://facebook.com/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="instagramUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://instagram.com/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="snapchatUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Snapchat URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://snapchat.com/add/username" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Étape 4: Informations professionnelles */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="job"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre profession" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Parlez-nous de vous..." className="min-h-32" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Étape 5: Avatar */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="avatar_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Photo de profil</FormLabel>
                        <FormControl>
                          <FileUpload onChange={field.onChange} value={field.value as File | null} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="bg-red-600 hover:bg-red-700 text-white">
                {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
