
import React from "react";
import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  blur?: "sm" | "md" | "lg";
  opacity?: "light" | "medium" | "heavy";
  padding?: boolean;
  border?: boolean;
  hover?: boolean;
  animation?: "fade-in" | "slide-up" | "none";
}

export const GlassContainer = ({
  children,
  className,
  blur = "md",
  opacity = "medium",
  padding = true,
  border = true,
  hover = false,
  animation = "none",
}: GlassContainerProps) => {
  const blurClass = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  };

  const opacityClass = {
    light: "bg-white/30 dark:bg-slate-900/30",
    medium: "bg-white/70 dark:bg-slate-900/70",
    heavy: "bg-white/90 dark:bg-slate-900/90",
  };

  const animationClass = {
    "fade-in": "animate-fade-in",
    "slide-up": "animate-slide-up",
    "none": "",
  };

  return (
    <div
      className={cn(
        blurClass[blur],
        opacityClass[opacity],
        padding && "p-4 md:p-6",
        border && "border border-white/20 dark:border-slate-800/50",
        hover && "transition-all hover:bg-white/80 dark:hover:bg-slate-800/80",
        "rounded-2xl shadow-sm",
        animationClass[animation],
        className
      )}
    >
      {children}
    </div>
  );
};
