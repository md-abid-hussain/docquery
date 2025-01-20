import Image from "next/image"

const techStack = [
  { name: "LangGraph", logo: "/langgraph-logo.png" },
  { name: "Next.js", logo: "/nextjs-logo.jpg" },
  { name: "CopilotKit", logo: "/copilotkit-logo.png" },
  { name: "CoAgent-0.3", logo: "/coagent-logo.jpg" },
  { name: "shadcn/ui", logo: "/shadcn-logo.png" },
  { name: "MongoDB", logo: "/mongodb-logo.jpg" },
  { name: "Together AI", logo: "/togetherai-logo.jpg" },
  { name: "Google Gemini", logo: "/gemini-logo.png" },
]

export function TechStack() {
  return (
    <section id="tech-stack" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-800">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 relative mb-4">
                <Image
                  src={tech.logo || "/placeholder.svg"}
                  alt={`${tech.name} logo`}
                  className="rounded-full"
                  height={80}
                  width={80}
                />
              </div>
              <p className="text-zinc-700 dark:text-zinc-300 text-center">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

