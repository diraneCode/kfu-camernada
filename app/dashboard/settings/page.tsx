import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Gérez les paramètres de votre plateforme.</p>
      </div>
      <Separator />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations générales</CardTitle>
              <CardDescription>Modifiez les informations de base de votre plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input id="site-name" defaultValue="MonSite" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-url">URL du site</Label>
                <Input id="site-url" defaultValue="https://monsite.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-email">Email de contact</Label>
                <Input id="site-email" defaultValue="contact@monsite.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Préférences de notifications</CardTitle>
              <CardDescription>Configurez vos préférences de notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-emails">Emails</Label>
                  <p className="text-sm text-muted-foreground">Recevoir des notifications par email.</p>
                </div>
                <Switch id="notify-emails" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-orders">Nouvelles commandes</Label>
                  <p className="text-sm text-muted-foreground">Être notifié pour chaque nouvelle commande.</p>
                </div>
                <Switch id="notify-orders" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-users">Nouveaux utilisateurs</Label>
                  <p className="text-sm text-muted-foreground">
                    Être notifié lors de l&apos;inscription d&apos;un nouvel utilisateur.
                  </p>
                </div>
                <Switch id="notify-users" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l&apos;apparence de votre plateforme.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Thème par défaut</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="theme-light" name="theme" defaultChecked />
                    <Label htmlFor="theme-light">Clair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="theme-dark" name="theme" />
                    <Label htmlFor="theme-dark">Sombre</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="theme-system" name="theme" />
                    <Label htmlFor="theme-system">Système</Label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="font-size">Taille de police</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline" size="sm">
                    Petite
                  </Button>
                  <Button variant="default" size="sm">
                    Moyenne
                  </Button>
                  <Button variant="outline" size="sm">
                    Grande
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Enregistrer</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
