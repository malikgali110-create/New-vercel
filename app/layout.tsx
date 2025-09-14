import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { HolderProvider } from "@/contexts/holder-context"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import "./globals.css"
import "../styles/brand-colors.css"

export const metadata: Metadata = {
  title: "EMC Store - Art Marketplace",
  description: "Discover extraordinary art collections powered by XRPL blockchain",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <HolderProvider>
           <CartProvider>
             <Navigation />
             <Suspense fallback={null}>
               {children}
             </Suspense>
             <Footer />
             <Analytics />
           </CartProvider>
         </HolderProvider>
      </body>
    </html>
  )
}
