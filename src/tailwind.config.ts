
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Quicksand', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        health: {
          primary: '#FF6B35',
          secondary: '#FF8C42',
          protein: '#4285F4',
          carbs: '#34A853',
          fat: '#FBBC04',
          water: '#4FC3F7',
          fiber: '#9C27B0',
          sugar: '#E91E63',
          sodium: '#FF5722'
        },
        vibrant: {
          orange: 'rgb(255, 107, 53)',
          amber: 'rgb(255, 140, 66)',
          coral: 'rgb(255, 89, 94)',
          teal: 'rgb(79, 195, 247)',
          emerald: 'rgb(52, 168, 83)',
          purple: 'rgb(156, 39, 176)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.07)',
        'hover': '0 10px 30px rgba(0, 0, 0, 0.12)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'highlight': '0 0 20px rgba(255, 107, 53, 0.6)',
        'glow': '0 0 25px rgba(255, 140, 66, 0.7)',
        'rainbow': '0 5px 20px rgba(255, 107, 53, 0.5), 0 12px 30px rgba(79, 195, 247, 0.4)',
        'intense': '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(255, 107, 53, 0.5)',
        'vibrant': '0 8px 32px rgba(255, 107, 53, 0.3), 0 4px 16px rgba(255, 140, 66, 0.2)',
        'vibrant-glow': '0 0 30px rgba(255, 107, 53, 0.6), 0 0 60px rgba(79, 195, 247, 0.3)',
        'prismatic': '0 5px 20px rgba(255, 89, 94, 0.5), 0 12px 30px rgba(79, 195, 247, 0.4)',
        'nebula': '0 8px 20px rgba(255, 107, 53, 0.3), 0 6px 12px rgba(255, 140, 66, 0.5)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow': {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(255, 107, 53, 0.6), 0 0 20px rgba(255, 107, 53, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(255, 107, 53, 0.8), 0 0 30px rgba(255, 107, 53, 0.4)' 
          },
        },
        'vibrant-pulse': {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.4',
            transform: 'scale(1.5)'
          },
        },
        'star-twinkle': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.5',
            transform: 'scale(0.8)'
          },
        },
        'bounce-glow': {
          '0%': { 
            transform: 'translateY(0)',
            boxShadow: '0 0 10px rgba(255, 107, 53, 0.3)'
          },
          '50%': { 
            transform: 'translateY(-10px)',
            boxShadow: '0 0 25px rgba(255, 107, 53, 0.6)'
          },
          '100%': { 
            transform: 'translateY(0)',
            boxShadow: '0 0 10px rgba(255, 107, 53, 0.3)'
          },
        },
        'gradient-shift': {
          '0%': { 
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            filter: 'hue-rotate(180deg)'
          },
          '100%': { 
            backgroundPosition: '0% 50%',
            filter: 'hue-rotate(360deg)'
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        'scale': 'scale 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'vibrant-pulse': 'vibrant-pulse 8s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'bounce-glow': 'bounce-glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, rgb(255, 107, 53) 0%, rgb(79, 195, 247) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, rgb(79, 195, 247) 0%, rgb(255, 89, 94) 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(249,250,251,0.8) 100%)',
        'gradient-highlight': 'linear-gradient(90deg, rgb(255, 107, 53) 0%, rgb(79, 195, 247) 100%)',
        'gradient-vibrant': 'linear-gradient(90deg, rgb(255, 107, 53), rgb(79, 195, 247), rgb(255, 89, 94), rgb(255, 140, 66))',
        'gradient-sunset': 'linear-gradient(to right, #FF6B35, #FF8C42, #FFB347)',
        'gradient-ocean': 'linear-gradient(to right, #4FC3F7, #29B6F6, #03A9F4)',
        'gradient-warm': 'linear-gradient(to bottom right, rgb(255, 107, 53), rgb(255, 140, 66), rgb(255, 89, 94))',
        'gradient-cool': 'linear-gradient(to right, #4FC3F7, #26C6DA, #00BCD4)',
        'gradient-energy': 'radial-gradient(circle at center, rgba(255, 107, 53, 0.8) 0%, rgba(255, 140, 66, 0) 70%)',
        'gradient-dynamic': 'radial-gradient(ellipse at bottom, rgb(255, 140, 66) 0%, rgb(255, 107, 53) 100%)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'glow': 'box-shadow',
        'backdrop': 'backdrop-filter',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'vibrant': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
