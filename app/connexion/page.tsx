'use client'

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { useAuth } from "@/contexts/AuthContext" // import de ton contexte

import { Loader2 } from "lucide-react" // pour spinner joli (facultatif)
import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated"
import { toast } from "sonner"

const formSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z.string().min(6, "Mot de passe trop court"),
  remember: z.boolean().optional(),
})

export default function LoginPage() {
  const router = useRouter()
  const { signIn } = useAuth()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const result = await signIn(values.email, values.password);

      console.log("Résultat de la connexion :", result); // Ajout pour déboguer

      if (result.success) {
        toast.success("Connexion réussie 🎉");
        router.push("/evenements/"); // Redirection en cas de succès
      } else {
        if (result.error == "AuthApiError: Invalid login credentials") {
          toast.error("Adresse email ou mot de passe incorrect 🚫")
        }
        if(result.error == "AuthApiError: Email not confirmed"){
          toast.error("Vous n'avez pas encore confirmer votre email", {
            description: "Veuillez vous rendre dans la messagerie que vous avez choisis pour vérifier votre adresse"
          })
        }
        // toast.error(result.error || "Erreur lors de la connexion ❌")
      }
    } catch (error: any) {
      toast.error("Erreur inattendue lors de la connexion ❌");
    } finally {
      setLoading(false);
    }
  }


  return (
    // <RedirectIfAuthenticated>
    <div className="flex items-center justify-center min-h-screen px-4 py-12">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
          <CardDescription className="text-center">
            Entrez vos identifiants pour accéder à votre compte
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="exemple@email.com" {...field} disabled={loading} />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Mot de passe</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} disabled={loading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={loading}
                      />
                    </FormControl>
                    <Label htmlFor="remember">Se souvenir de moi</Label>
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Connexion...</span>
                  </div>
                ) : (
                  "Se connecter"
                )}
              </Button>
              <p className="text-sm text-center">
                Vous n'avez pas de compte ?{" "}
                <Link href="/inscription" className="text-primary hover:underline">
                  S'inscrire
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
    // </RedirectIfAuthenticated>
  )
}
