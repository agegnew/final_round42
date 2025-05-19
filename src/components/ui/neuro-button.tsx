"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const neuroButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-background shadow-[6px_6px_10px_0px_rgba(0,0,0,0.05),-6px_-6px_10px_0px_rgba(255,255,255,0.8)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.05),0px_0px_0px_0px_rgba(255,255,255,0.8)] active:shadow-[inset_4px_4px_8px_0px_rgba(0,0,0,0.05),inset_-4px_-4px_8px_0px_rgba(255,255,255,0.8)] dark:shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3),-5px_-5px_10px_0px_rgba(255,255,255,0.05)] dark:hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.3),0px_0px_0px_0px_rgba(255,255,255,0.05)] dark:active:shadow-[inset_4px_4px_8px_0px_rgba(0,0,0,0.3),inset_-4px_-4px_8px_0px_rgba(255,255,255,0.05)]",
        outline:
          "border border-input bg-background shadow-[3px_3px_6px_0px_rgba(0,0,0,0.05),-3px_-3px_6px_0px_rgba(255,255,255,0.8)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.05),0px_0px_0px_0px_rgba(255,255,255,0.8)] active:shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.05),inset_-2px_-2px_4px_0px_rgba(255,255,255,0.8)] dark:shadow-[3px_3px_6px_0px_rgba(0,0,0,0.3),-3px_-3px_6px_0px_rgba(255,255,255,0.05)] dark:hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,0.3),0px_0px_0px_0px_rgba(255,255,255,0.05)] dark:active:shadow-[inset_2px_2px_4px_0px_rgba(0,0,0,0.3),inset_-2px_-2px_4px_0px_rgba(255,255,255,0.05)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface NeuroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neuroButtonVariants> {}

const NeuroButton = React.forwardRef<HTMLButtonElement, NeuroButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(neuroButtonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
NeuroButton.displayName = "NeuroButton";

// Motion variant with animation
export function NeuroButtonMotion({
  className,
  variant,
  size,
  children,
  ...props
}: NeuroButtonProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <button
        className={cn(neuroButtonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    </motion.div>
  );
}

export { NeuroButton, neuroButtonVariants }; 