import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-zinc-900 dark:bg-zinc-50">
      <div className="container px-4 md:px-6">
        <div
          className="flex flex-col items-center space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white dark:text-zinc-900">
            Ready to Supercharge Your Documentation?
          </h2>
          <p className="max-w-[600px] text-zinc-200 dark:text-zinc-700 md:text-xl">
            Start building your intelligent knowledge base with DocQuery today.
          </p>
          <Button size="lg" asChild variant="outline">
            <Link href="/d/chat">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

