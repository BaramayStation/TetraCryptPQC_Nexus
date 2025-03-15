
import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const GlassContainer = React.forwardRef<HTMLDivElement, GlassContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-background/80 backdrop-blur-sm border rounded-lg shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);

GlassContainer.displayName = "GlassContainer";
