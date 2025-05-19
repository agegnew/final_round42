"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassmorphicCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export function GlassmorphicCard({ title, description, icon, className }: GlassmorphicCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/20 p-6 group",
        "bg-gradient-to-br from-white/10 to-white/5",
        "shadow-[0_8px_30px_rgb(0,0,0,0.06)]",
        "transition-all duration-300 ease-out",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -5,
        boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
        background: "linear-gradient(to bottom right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
      }}
    >
      {/* Background glow effect */}
      <div className={cn(
        "absolute -inset-0.5 bg-gradient-to-br from-[#FFA500]/30 to-[#2D9979]/30 opacity-0 blur-xl",
        "transition-opacity duration-500",
        isHovered ? "opacity-100" : "opacity-0"
      )} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-4 text-[#FFA500]">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
        
        {/* Hover indicator */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#FFA500] to-[#2D9979]"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      {/* Corner decoration */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-10 -rotate-12">
        <svg width="65" height="65" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 65L65 0H0V65Z" fill="url(#paint0_linear)" />
          <defs>
            <linearGradient id="paint0_linear" x1="0" y1="32.5" x2="65" y2="32.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFA500" />
              <stop offset="1" stopColor="#2D9979" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </motion.div>
  );
} 