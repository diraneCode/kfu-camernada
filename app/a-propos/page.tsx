import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Globe, Calendar, MapPin, Mail } from "lucide-react"
import Image from "next/image"

export const metadata: Metadata = {
  title: "À propos | Solidarité CamerNada",
  description: "Découvrez l'histoire et la mission de Solidarité CamerNada",
}

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Background pattern */}
      <div className="absolute inset-0 street-pattern opacity-10 z-0"></div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-secondary py-20 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Notre Histoire</h1>
            <p className="text-xl mb-8 animate-slide-up">
              Découvrez comment Solidarité CamerNada est née et comment nous travaillons à rassembler les Camerounais
              vivant au Canada.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 text-primary relative inline-block">
                Notre Mission
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary"></span>
              </h2>
              <p className="text-lg mb-6">
                Solidarité CamerNada est née en 2018 de la volonté de créer un espace d'échange et de partage pour les
                Camerounais vivant au Canada. Notre objectif est de faciliter l'intégration, de promouvoir la culture
                camerounaise et de renforcer les liens entre les membres de notre communauté.
              </p>
              <p className="text-lg mb-6">
                À travers notre plateforme, nous organisons des événements culturels, des rencontres professionnelles,
                des activités sportives et des actions de solidarité pour soutenir à la fois notre communauté au Canada
                et des projets au Cameroun.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <Card className="transform transition-transform hover:scale-105 hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Users className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">500+</h3>
                    <p className="text-gray-600">Membres actifs</p>
                  </CardContent>
                </Card>
                <Card className="transform transition-transform hover:scale-105 hover:shadow-lg">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Calendar className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">50+</h3>
                    <p className="text-gray-600">Événements organisés</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  width={1000}
                  height={1000}
                  src="/Camernada.jpg?height=400&width=600"
                  alt="Communauté Camerounaise au Canada"
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-white to-gray-50 border-none shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Solidarité</h3>
                <p className="text-gray-600">
                  Nous croyons en l'entraide et au soutien mutuel pour renforcer notre communauté et aider chacun à
                  s'épanouir au Canada.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white to-gray-50 border-none shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Diversité</h3>
                <p className="text-gray-600">
                  Nous célébrons la richesse culturelle du Cameroun et encourageons le partage et l'échange avec la
                  société canadienne.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-white to-gray-50 border-none shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Communauté</h3>
                <p className="text-gray-600">
                  Nous travaillons à créer des liens forts entre les membres de notre communauté pour favoriser
                  l'intégration et le bien-être de tous.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                nom: "Kamaha",
                poste: "CEO Fondateur",
                photo: "kamaha.png",
              },
              {
                nom: "Dirane",
                poste: "Développeur",
                photo: "joker.jpg",
              },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-lg mb-4 transform transition-transform group-hover:scale-105">
                  <Image
                    width={1000}
                    height={1000}
                    src={`/${member.photo}?height=400&width=300&text=Membre ${member}`}
                    alt={`Membre de l'équipe ${member}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold">{member.nom}</h3>
                      <p className="text-sm">{member.poste}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gray-50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

          <h2 className="text-3xl font-bold mb-8 text-center relative z-10">Contactez-nous</h2>
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            <div>
              <p className="text-lg mb-6">
                Vous avez des questions ou des suggestions ? N'hésitez pas à nous contacter. Notre équipe sera ravie de
                vous répondre.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>contact@solidaritecamernada.ca</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary mr-3" />
                  <span>123 Rue Principale, Montréal, QC H2X 1Y6</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                <Button className="w-full">Envoyer</Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
