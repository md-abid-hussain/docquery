"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Database, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48">
      {/* Background gradient effects */}
      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>

      <div className="container relative px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div
              className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium 
              bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 mb-4"
            >
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered Documentation Search
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              <span className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-100 bg-clip-text text-transparent">
                Welcome to DocQuery
              </span>
            </h1>
            <p className="mx-auto max-w-[700px] text-zinc-500 md:text-xl dark:text-zinc-400 mt-4">
              Create powerful knowledge bases for LLMs using your markdown
              documentation. Transform how you interact with your documentation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 "
          >
            <Button size="lg" className="group">
              <Link href="/d/chat" className="flex items-center gap-2">
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 "
          >
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center space-y-2 p-4 rounded-lg 
                  bg-white dark:bg-zinc-800/50 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Documentation Search",
    description:
      "Instantly find the information you need with AI-powered search",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Knowledge Base",
    description: "Build a comprehensive knowledge base from your documentation",
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "AI Integration",
    description: "Leverage LLMs to get intelligent answers from your docs",
    icon: <Sparkles className="h-5 w-5" />,
  },
];
