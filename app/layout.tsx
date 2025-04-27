import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/components/cart-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Communauté Camerounaise au Canada",
  description: "Plateforme pour la communauté camerounaise au Canada",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <ReactQueryProvider>
            <AuthProvider>
              <CartProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-1">
                    {children}
                  </main>
                  <Footer />
                </div>
              </CartProvider>
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html >
  )
}


import './globals.css'
import ReactQueryProvider from "@/providers/ReactQueryProvider"
import { Suspense } from "react"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from "sonner"

