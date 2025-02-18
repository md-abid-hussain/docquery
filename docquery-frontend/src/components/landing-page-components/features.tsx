"use client";

import { Github, FileText, Database, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Github,
    title: "GitHub Integration",
    description:
      "Easily fetch repository details and select markdown files for ingestion.",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: FileText,
    title: "Markdown Processing",
    description:
      "Ingest and process markdown files used for documentation or detailed explanations.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Database,
    title: "Knowledge Base Creation",
    description:
      "Build comprehensive knowledge bases for LLMs from your documentation.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description:
      "Leverage advanced LLMs to generate insights and answer queries based on your knowledge base.",
    gradient: "from-amber-500 to-amber-600",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900"
    >
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tighter sm:text-5xl"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-[700px] mx-auto text-lg"
          >
            Everything you need to transform your documentation into an
            intelligent knowledge base
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-800 p-6 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div
                  className={`p-4 rounded-xl bg-gradient-to-br ${feature.gradient} bg-opacity-10 dark:bg-opacity-20`}
                >
                  <feature.icon className="w-8 h-8 text-white dark:text-zinc-200" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
