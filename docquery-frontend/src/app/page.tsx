import Link from "next/link"
import { Hero } from "@/components/other/hero"
import { CTA } from "@/components/other/cta"
import { Features } from "@/components/other/features"
import { Benefits } from "@/components/other/benefits"
import { TechStack } from "@/components/other/tech-stack"

import { Mountain } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 lg:p-6 flex items-center fixed top-0 w-full z-50 bg-white">
        <Link className="flex items-center justify-center" href="/">
          <Mountain className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">DocQuery</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#benefits">
            Benefits
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#tech-stack">
            Tech Stack
          </Link>
        </nav>
      </header>
      <main className="flex-1 mt-20">
        <Hero />
        <Features />
        <Benefits />
        <TechStack />
        <CTA />
      </main>
    </div>
  )
}

