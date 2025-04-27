import { RedirectIfAuthenticated } from "@/components/RedirectIfAuthenticated"
import { MultiStepForm } from "@/components/steps/multi-step-form"

export default function RegisterPage() {

  return (
    <RedirectIfAuthenticated>
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-16rem)]">
        <div className="w-full max-w-4xl z-10">
          <MultiStepForm />
        </div>
      </div>
    </RedirectIfAuthenticated>
  )
}
