import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: "low" | "medium" | "high";
  border?: boolean;
}

export function GlassCard({
  className,
  children,
  intensity = "medium",
  border = true,
  ...props
}: GlassCardProps) {
  const intensityClasses = {
    low: "bg-background/30 backdrop-blur-sm",
    medium: "bg-background/40 backdrop-blur-md",
    high: "bg-background/50 backdrop-blur-lg",
  };

  return (
    <div
      className={cn(
        "rounded-2xl shadow-sm",
        intensityClasses[intensity],
        border && "border border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 