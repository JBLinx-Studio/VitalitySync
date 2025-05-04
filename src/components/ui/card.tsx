
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Enhanced glass card variants with improved visual effects
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg glass-card shadow-soft transition-all duration-300 hover:shadow-lg relative overflow-hidden",
      className
    )}
    {...props}
  />
))
GlassCard.displayName = "GlassCard"

const FrostedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg frosted-glass shadow-soft transition-all duration-300 hover:shadow-lg relative overflow-hidden",
      className
    )}
    {...props}
  />
))
FrostedCard.displayName = "FrostedCard"

const NeoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg neo-glass shadow-soft transition-all duration-300 hover:shadow-lg relative overflow-hidden",
      className
    )}
    {...props}
  />
))
NeoCard.displayName = "NeoCard"

// Ultra-enhanced card with advanced effects and animations
const UltraCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: `perspective(1000px) rotateX(${position.y * -10}deg) rotateY(${position.x * 10}deg) scale(1.02)`,
    transition: 'all 0.2s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-lg ultra-glass shadow-glow transition-all duration-300 hover:shadow-highlight relative overflow-hidden",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 dark:from-transparent dark:to-white/10"></span>
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-radial from-health-primary/20 to-transparent blur-2xl transform transition-all duration-700 ease-out group-hover:translate-x-10"></div>
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-radial from-health-secondary/20 to-transparent blur-2xl transform transition-all duration-700 ease-out group-hover:translate-x-10"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
UltraCard.displayName = "UltraCard"

// New iridescent glass effect card
const IridescentCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: `perspective(1000px) rotateX(${position.y * -8}deg) rotateY(${position.x * 8}deg) scale(1.02)`,
    transition: 'all 0.3s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-lg iridescent-glass shadow-rainbow transition-all duration-500 hover:shadow-highlight relative overflow-hidden",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 dark:from-transparent dark:to-white/10 z-0"></div>
      <div className="absolute inset-0 iridescent-shimmer z-0"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
IridescentCard.displayName = "IridescentCard"

// New floating card with parallax effect
const FloatingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg float-card shadow-soft transition-all duration-500 hover:shadow-highlight relative overflow-hidden animate-float-slow",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-health-primary/10 to-health-secondary/10 z-0"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
FloatingCard.displayName = "FloatingCard"

// New cosmic card with space-like effects
const CosmicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: `perspective(1000px) rotateX(${position.y * -5}deg) rotateY(${position.x * 5}deg)`,
    transition: 'all 0.3s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-lg cosmic-glass shadow-cosmic transition-all duration-500 hover:shadow-cosmic-glow relative overflow-hidden",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/30 z-0"></div>
      <div className="absolute inset-0 cosmic-stars z-0"></div>
      <div className="absolute inset-0 cosmic-nebula z-0"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
CosmicCard.displayName = "CosmicCard"

// New prismatic card with rainbow reflections
const PrismaticCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: `perspective(1000px) rotateX(${position.y * -7}deg) rotateY(${position.x * 7}deg) scale(1.02)`,
    transition: 'all 0.3s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-lg prismatic-glass shadow-rainbow transition-all duration-500 hover:shadow-prismatic relative overflow-hidden",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-white/10 dark:from-white/5 dark:to-white/10 z-0"></div>
      <div className="absolute inset-0 prismatic-effect z-0"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
PrismaticCard.displayName = "PrismaticCard"

// Utility function to merge refs
function mergeRefs<T = any>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | null | undefined>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  GlassCard,
  FrostedCard,
  NeoCard,
  UltraCard,
  IridescentCard,
  FloatingCard,
  CosmicCard,
  PrismaticCard
}
