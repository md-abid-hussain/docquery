"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const techStack = [
  { name: "LangGraph", logo: "/langgraph-logo.png" },
  { name: "Next.js", logo: "/nextjs-logo.jpg" },
  { name: "CopilotKit", logo: "/copilotkit-logo.png" },
  { name: "CoAgent v0.5", logo: "/coagent-logo.jpg" },
  { name: "shadcn/ui", logo: "/shadcn-logo.png" },
  { name: "MongoDB", logo: "/mongodb-logo.jpg" },
  { name: "Together AI", logo: "/togetherai-logo.jpg" },
  { name: "Google Gemini", logo: "/gemini-logo.png" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-zinc-800"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            Powered By Modern Tech Stack
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-[700px] mx-auto text-lg">
            Built with cutting-edge technologies for optimal performance
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex flex-col items-center group"
            >
              <div
                className="relative mb-4 rounded-full overflow-hidden bg-white dark:bg-zinc-700/50 
                            w-24 h-24 p-4 shadow-sm group-hover:shadow-md transition-all duration-300
                            ring-2 ring-transparent group-hover:ring-primary/20
                            before:content-[''] before:absolute before:inset-0 before:rounded-full
                            before:bg-gradient-to-br before:from-primary/5 before:to-transparent"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={tech.logo || "/placeholder.svg"}
                    alt={`${tech.name} logo`}
                    className="object-contain scale-90 group-hover:scale-100 transition-transform duration-300"
                    fill
                    sizes="(max-width: 96px) 100vw, 96px"
                  />
                </div>
              </div>
              <p
                className="text-zinc-700 dark:text-zinc-300 font-medium 
                          group-hover:text-primary transition-colors duration-300"
              >
                {tech.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
