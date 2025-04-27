import { Suspense } from "react"
import SubscriptionPage from "@/components/subscription-page"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<LoadingSpinner />}>
        <SubscriptionPage />
      </Suspense>
    </main>
  )
}
