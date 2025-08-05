import * as React from "react";
import { cn } from "./utils";

// Simplified sidebar components for basic functionality
function SidebarProvider({ children, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex h-full", className)} {...props}>
      {children}
    </div>
  );
}

function Sidebar({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col h-full bg-card border-r", className)} {...props}>
      {children}
    </div>
  );
}

function SidebarContent({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex-1 overflow-auto", className)} {...props}>
      {children}
    </div>
  );
}

function SidebarHeader({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("p-4 border-b", className)} {...props}>
      {children}
    </div>
  );
}

function SidebarMenu({ className, children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className={cn("space-y-1", className)} {...props}>
      {children}
    </ul>
  );
}

function SidebarMenuItem({ className, children, ...props }: React.ComponentProps<"li">) {
  return (
    <li className={cn("", className)} {...props}>
      {children}
    </li>
  );
}

function SidebarMenuButton({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button 
      className={cn(
        "w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-md hover:bg-accent transition-colors",
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
}

function SidebarTrigger({ className, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button className={cn("p-2", className)} {...props}>
      {children}
    </button>
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
};