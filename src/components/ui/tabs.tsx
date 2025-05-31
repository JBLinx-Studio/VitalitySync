
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
      "inline-flex h-14 items-center justify-center rounded-2xl bg-white/20 dark:bg-slate-900/20 backdrop-blur-2xl p-2 text-muted-foreground shadow-2xl border border-white/30 dark:border-gray-700/30 transition-all duration-500 hover:shadow-3xl relative overflow-hidden group",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10 flex w-full">{props.children}</div>
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
      "inline-flex items-center justify-center whitespace-nowrap rounded-xl px-6 py-3 text-sm font-semibold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group min-w-fit",
      "hover:bg-white/20 dark:hover:bg-slate-800/20 hover:text-gray-900 dark:hover:text-gray-100 hover:shadow-lg hover:scale-[1.03] hover:backdrop-blur-xl",
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:via-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-2xl data-[state=active]:shadow-blue-500/30 data-[state=active]:scale-[1.05] data-[state=active]:border data-[state=active]:border-white/20",
      "active:scale-[0.98] backdrop-blur-sm border border-white/10 dark:border-slate-700/10",
      className
    )}
    {...props}
  >
    <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 group-data-[state=active]:opacity-100 transition-opacity duration-300"></span>
    <span className="relative z-10 flex items-center gap-2 font-medium">
      {props.children}
    </span>
    
    {/* Active state indicator */}
    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/80 rounded-full opacity-0 group-data-[state=active]:opacity-100 transition-all duration-300 shadow-lg animate-pulse"></span>
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
    <div className="bg-white/5 dark:bg-slate-900/5 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-slate-700/10 p-6 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent rounded-full blur-2xl"></div>
      <div className="relative z-10">
        {props.children}
      </div>
    </div>
  </TabsPrimitive.Content>
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
