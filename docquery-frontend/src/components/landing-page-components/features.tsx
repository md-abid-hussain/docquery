import { Github, FileText, Database, Zap } from "lucide-react"

const features = [
  {
    icon: Github,
    title: "GitHub Integration",
    description: "Easily fetch repository details and select markdown files for ingestion.",
  },
  {
    icon: FileText,
    title: "Markdown Processing",
    description: "Ingest and process markdown files used for documentation or detailed explanations.",
  },
  {
    icon: Database,
    title: "Knowledge Base Creation",
    description: "Build comprehensive knowledge bases for LLMs from your documentation.",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Leverage advanced LLMs to generate insights and answer queries based on your knowledge base.",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center"
            >
              <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center mb-4">
                <feature.icon className="w-12 h-12 text-zinc-800 dark:text-zinc-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

