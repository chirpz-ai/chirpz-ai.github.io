"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <div className="container flex flex-col items-center justify-center gap-4 py-24 md:py-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="block bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300"
          >
            Model Governance Reporting
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-2 block"
          >
            <span className="text-primary">Automated</span> by AI
          </motion.span>
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mx-auto max-w-[700px] text-muted-foreground md:text-xl"
        >
          Streamline AI governance reporting for insurance SaaS providers with intelligent agents that turn complex metrics into ready-to-ship reports.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          <Link
            href="#contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-lg font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get in Touch
          </Link>
          <Link
            href="#features"
            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-lg font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 