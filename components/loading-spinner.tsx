import { Loader2 } from "lucide-react"

export function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="h-12 w-12 text-red-500 animate-spin" />
            <p className="mt-4 text-lg text-gray-600">Chargement en cours...</p>
        </div>
    )
}
