
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden group backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] border border-white/20",
        destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] border border-red-300/30",
        outline: "border-2 border-white/30 dark:border-gray-600/30 bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl hover:bg-white/20 dark:hover:bg-slate-800/20 hover:border-white/50 dark:hover:border-gray-500/50 hover:shadow-xl hover:scale-[1.03] active:scale-[0.97]",
        secondary: "bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-slate-800/80 dark:to-slate-700/80 text-gray-900 dark:text-gray-100 hover:from-gray-200/90 hover:to-gray-300/90 dark:hover:from-slate-700/90 dark:hover:to-slate-600/90 shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] border border-gray-200/50 dark:border-slate-600/50",
        ghost: "hover:bg-white/15 dark:hover:bg-slate-800/15 hover:text-gray-900 dark:hover:text-gray-100 hover:scale-[1.03] active:scale-[0.97] hover:shadow-lg border border-transparent hover:border-white/20 dark:hover:border-slate-700/20",
        link: "text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300",
        
        // Enhanced premium variants
        success: "bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-white hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] border border-emerald-300/30",
        warning: "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] border border-amber-300/30",
        info: "bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 text-white hover:from-cyan-600 hover:via-blue-600 hover:to-cyan-700 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] border border-cyan-300/30",
        
        // Premium glass variants with enhanced effects
        glass: "bg-white/15 dark:bg-slate-900/15 backdrop-blur-2xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-gray-100 hover:bg-white/25 dark:hover:bg-slate-900/25 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] hover:border-white/50 dark:hover:border-gray-600/50",
        "glass-primary": "bg-blue-500/15 backdrop-blur-2xl border border-blue-300/40 text-blue-700 dark:text-blue-300 hover:bg-blue-500/25 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97] hover:border-blue-400/60",
        "glass-cosmic": "bg-gradient-to-r from-purple-500/15 via-blue-500/15 to-pink-500/15 backdrop-blur-2xl border border-purple-300/30 text-purple-700 dark:text-purple-300 hover:from-purple-500/25 hover:via-blue-500/25 hover:to-pink-500/25 shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.97]",
      },
      size: {
        default: "h-12 px-6 py-3 text-sm",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base",
        xl: "h-16 rounded-2xl px-10 text-lg",
        icon: "h-12 w-12 rounded-xl",
        pill: "h-12 rounded-full px-8",
        compact: "h-8 px-3 text-xs rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {/* Enhanced shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_ease-in-out] transition-opacity duration-300 -skew-x-12"></span>
        
        {/* Glow effect for premium variants */}
        {(variant === 'default' || variant?.includes('glass')) && (
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 -z-10"></span>
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {loading && (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
