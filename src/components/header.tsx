"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <span className="font-bold text-xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                chirpz.ai
              </span>
            </motion.div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link 
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link 
              href="#about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
            <Link 
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
} 