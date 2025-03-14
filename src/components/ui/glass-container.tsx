
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
  const animationClass = animation ? `animate-${animation}` : "";
  
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
