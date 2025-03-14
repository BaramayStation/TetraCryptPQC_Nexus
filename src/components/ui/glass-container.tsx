
import React from "react";
import { cn } from "@/lib/utils";

interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  animation?: "fade-in" | "slide-up" | "slide-down" | "slide-left" | "slide-right" | "blur-in";
  delay?: number;
}

export const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className,
  hover = false,
  animation,
  delay,
  style,
  ...props
}) => {
  const getAnimationClass = (anim?: string) => {
    switch (anim) {
      case "fade-in": return "animate-fade-in";
      case "slide-up": return "animate-slide-up";
      case "slide-down": return "animate-slide-down";
      case "slide-left": return "animate-slide-left";
      case "slide-right": return "animate-slide-right";
      case "blur-in": return "animate-blur-in";
      default: return "";
    }
  };
  
  const animationClass = animation ? getAnimationClass(animation) : "";
  
  const customStyles = delay 
    ? { ...style, animationDelay: `${delay}ms` } 
    : style;

  return (
    <div
      className={cn(
        "glass-container rounded-xl",
        hover && "glass-container-hover",
        animationClass,
        animation && "opacity-0", // Start with opacity 0 if animating
        className
      )}
      style={customStyles}
      {...props}
    >
      {children}
    </div>
  );
};
