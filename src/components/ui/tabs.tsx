
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-3xl bg-black/30 backdrop-blur-2xl p-2 text-muted-foreground shadow-2xl border border-white/20 transition-all duration-500 hover:shadow-3xl relative overflow-hidden group w-full",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 flex w-full gap-2">{props.children}</div>
  </TabsPrimitive.List>
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-2xl px-6 py-4 text-sm font-bold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group flex-1 min-h-[60px]",
      "hover:bg-gradient-to-br hover:from-gray-700/60 hover:to-gray-800/60 hover:text-white hover:shadow-xl hover:scale-[1.02] hover:backdrop-blur-xl",
      "data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-blue-500/30 data-[state=active]:scale-[1.05] data-[state=active]:border-2 data-[state=active]:border-white/30",
      "active:scale-[0.98] backdrop-blur-sm border border-white/10",
      className
    )}
    {...props}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></span>
    <span className="relative z-10 flex items-center gap-3 font-bold text-center justify-center w-full">
      {props.children}
    </span>
    
    {/* Active state indicator */}
    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/90 rounded-full opacity-0 group-data-[state=active]:opacity-100 transition-all duration-300 shadow-lg animate-pulse"></span>
  </TabsPrimitive.Trigger>
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-8 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 relative",
      "animate-in fade-in-50 slide-in-from-bottom-4 duration-500 ease-out",
      "data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0 data-[state=inactive]:slide-out-to-bottom-4",
      className
    )}
    {...props}
  >
    <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl"></div>
      <div className="relative z-10">
        {props.children}
      </div>
    </div>
  </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
