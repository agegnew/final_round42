"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Your journey starts here. Let's build something amazing together.
          </p>
        </motion.div>
      </div>
    </main>
  );
} 