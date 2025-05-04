
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md",
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

// Premium glass card variants with enhanced visual effects
const GlassCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl premium-glass-card shadow-soft transition-all duration-300 hover:shadow-premium relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 z-0 rounded-xl"></div>
      <div className="absolute inset-0 light-reflection z-0 rounded-xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
GlassCard.displayName = "GlassCard"

// Enhanced frosted glass effect with premium aesthetics
const FrostedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl premium-frosted shadow-premium transition-all duration-300 hover:shadow-premium-hover relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-white/5 to-transparent z-0 rounded-xl"></div>
      <div className="absolute inset-0 premium-shimmer z-0 rounded-xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
FrostedCard.displayName = "FrostedCard"

// Premium neo-morphic effect with enhanced borders and shadows
const NeoCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl premium-neo shadow-neo transition-all duration-300 hover:shadow-neo-hover relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent z-0 rounded-xl"></div>
      <div className="absolute -inset-[1px] premium-border z-0 rounded-xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
NeoCard.displayName = "NeoCard"

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

// Ultra-premium 3D interactive card with advanced lighting effects
const UltraCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: isHovering ? 
      `perspective(1000px) rotateX(${position.y * -8}deg) rotateY(${position.x * 8}deg) scale(1.02)` :
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'all 0.3s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-xl ultra-premium-glass shadow-ultra transition-all duration-500 relative overflow-hidden",
        isHovering ? "shadow-ultra-hover" : "",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0 rounded-xl"></div>
      <div className={`absolute inset-0 ultra-light-effect transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'} z-0 rounded-xl`} 
           style={{ 
             background: `radial-gradient(circle at ${50 + position.x * 100}% ${50 + position.y * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)` 
           }}>
      </div>
      <div className="absolute inset-0 premium-highlight z-0 rounded-xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
UltraCard.displayName = "UltraCard"

// Premium iridescent effect with improved rainbow reflections
const IridescentCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: isHovering ? 
      `perspective(1000px) rotateX(${position.y * -7}deg) rotateY(${position.x * 7}deg) scale(1.02)` :
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'all 0.4s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-xl premium-iridescent shadow-iridescent transition-all duration-500 relative overflow-hidden",
        isHovering ? "shadow-iridescent-hover" : "",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0 rounded-xl"></div>
      <div className="absolute inset-0 premium-iridescent-effect z-0 rounded-xl"></div>
      <div className={`absolute inset-0 iridescent-highlight transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-60'} z-0 rounded-xl`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
IridescentCard.displayName = "IridescentCard"

// Premium cosmic card with advanced space effects
const CosmicCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: isHovering ? 
      `perspective(1000px) rotateX(${position.y * -5}deg) rotateY(${position.x * 5}deg)` :
      'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'all 0.4s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-xl premium-cosmic shadow-cosmic transition-all duration-500 relative overflow-hidden",
        isHovering ? "shadow-cosmic-hover" : "",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/30 z-0 rounded-xl"></div>
      <div className="absolute inset-0 premium-stars z-0 rounded-xl"></div>
      <div className="absolute inset-0 premium-nebula z-0 rounded-xl"></div>
      <div className={`absolute inset-0 cosmic-pulse transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-70'} z-0 rounded-xl`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
CosmicCard.displayName = "CosmicCard"

// Premium floating card effect with gentle animation
const FloatingCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl premium-float shadow-float transition-all duration-500 hover:shadow-float-hover relative overflow-hidden animate-premium-float",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-health-primary/10 to-health-secondary/10 z-0 rounded-xl"></div>
      <div className="absolute inset-0 premium-float-effect z-0 rounded-xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
FloatingCard.displayName = "FloatingCard"

// Premium gradient card with advanced color transitions
const GradientCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [isHovering, setIsHovering] = React.useState(false);
  
  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
  }, []);
  
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl premium-gradient shadow-gradient transition-all duration-500 relative overflow-hidden",
        isHovering ? "shadow-gradient-hover" : "",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-health-primary/80 to-health-secondary/80 z-0 rounded-xl"></div>
      <div className={`absolute inset-0 premium-gradient-pulse transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-80'} z-0 rounded-xl`}></div>
      <div className="relative z-10 text-white">
        {children}
      </div>
    </div>
  );
})
GradientCard.displayName = "GradientCard"

// Premium aurora card with northern lights effect
const AuroraCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    setPosition({ x, y });
  }, []);
  
  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true);
  }, []);
  
  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
    setPosition({ x: 0, y: 0 });
  }, []);
  
  const style = {
    transform: isHovering ? 
      `perspective(1000px) rotateX(${position.y * -6}deg) rotateY(${position.x * 6}deg) scale(1.01)` :
      'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    transition: 'all 0.4s ease'
  };
  
  return (
    <div
      ref={mergeRefs(ref, cardRef)}
      className={cn(
        "rounded-xl premium-aurora shadow-aurora transition-all duration-500 relative overflow-hidden",
        isHovering ? "shadow-aurora-hover" : "",
        className
      )}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#073b4c]/30 to-[#118ab2]/20 z-0 rounded-xl"></div>
      <div className="absolute inset-0 premium-aurora-effect z-0 rounded-xl"></div>
      <div className={`absolute inset-0 aurora-highlight transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-70'} z-0 rounded-xl`}></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
})
AuroraCard.displayName = "AuroraCard"

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
  GradientCard,
  AuroraCard
}
