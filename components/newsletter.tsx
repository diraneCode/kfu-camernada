import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";

export default function Newsletter() {
    return (
        <div className="mt-20 p-8 md:p-12 bg-gradient-to-r from-red-600 to-red-800 rounded-xl text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">Abonnez-vous à notre newsletter</h2>
                    <p className="text-white/80 mb-6">
                        Recevez les derniers articles, événements et nouvelles de la communauté directement dans votre boîte de
                        réception
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                            placeholder="Votre adresse email"
                            className="bg-white/20 border-white/30 placeholder:text-white/60 text-white"
                        />
                        <Button className="bg-white text-red-600 hover:bg-white/90 whitespace-nowrap">S&apos;abonner</Button>
                    </div>
                </div>
                <div className="hidden md:block relative h-60">
                    <Image
                        src="/kamer.jpg?height=300&width=400"
                        alt="Newsletter"
                        fill
                        className="w-full h-full object-cover rounded-lg opacity-90"
                    />
                </div>
            </div>
        </div>
    )
}