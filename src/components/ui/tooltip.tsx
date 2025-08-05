import * as React from "react";
import { cn } from "./utils";

// Simplified tooltip for basic functionality
function TooltipProvider({ children }: { children: React.ReactNode; delayDuration?: number }) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function TooltipTrigger({ 
  children}: { 
  children: React.ReactNode; 
  asChild?: boolean;
}) {
  return <>{children}</>;
}

function TooltipContent({ 
  children, 
  className,
  hidden = false,
  ...props 
}: React.ComponentProps<"div"> & {
  hidden?: boolean;
}) {
  if (hidden) return null;
  
  return (
    <div 
      className={cn(
        "z-50 overflow-hidden rounded-md bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
};