"use client";

import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Enhanced Search Experience",
    description:
      "Improved documentation searchability and accessibility with AI-powered search",
  },
  {
    title: "Smart Q&A System",
    description:
      "Enhanced AI-powered question answering capabilities for faster problem solving",
  },
  {
    title: "Knowledge Management",
    description:
      "Streamlined knowledge management for development teams with intelligent organization",
  },
  {
    title: "Quick Onboarding",
    description:
      "Faster onboarding and reduced learning curve for new team members",
  },
  {
    title: "Resource Optimization",
    description:
      "Efficient utilization of existing documentation resources with smart indexing",
  },
  {
    title: "Seamless Integration",
    description:
      "Seamless integration with popular documentation formats and development platforms",
  },
];

export function Benefits() {
  return (
    <section
      id="benefits"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-800"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
            Benefits of DocQuery
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-[700px] mx-auto text-lg">
            Experience the power of AI-driven documentation management
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-4 p-6 rounded-xl bg-white dark:bg-zinc-800/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                  {benefit.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
