import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-zinc-50 dark:bg-zinc-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to DocQuery
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 mt-4">
              Create powerful knowledge bases for LLMs using your markdown documentation.
            </p>
          </div>
          <div>
            <Button size="lg" asChild>
              <Link href="/d/chat">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

