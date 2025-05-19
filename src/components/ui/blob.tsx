"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlobProps {
  className?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  position?: string;
  animate?: boolean;
}

export function Blob({
  className,
  color = "primary",
  size = "md",
  position,
  animate = true,
}: BlobProps) {
  const sizeClasses = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
  };

  const variants = {
    initial: {
      scale: 1,
      borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
    },
    animate: {
      scale: [1, 1.05, 1.03, 1],
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "40% 60% 70% 30% / 30% 60% 40% 70%",
        "30% 60% 70% 40% / 50% 60% 30% 60%",
        "60% 40% 30% 70% / 60% 30% 70% 40%",
      ],
    },
  };

  return (
    <motion.div
      className={cn(
        "absolute rounded-full blur-3xl opacity-20",
        sizeClasses[size],
        position,
        `bg-${color}`,
        className
      )}
      initial="initial"
      animate={animate ? "animate" : "initial"}
      variants={variants}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
} 