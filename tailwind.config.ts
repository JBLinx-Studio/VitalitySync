
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
          primary: '#4FD1C5',
          secondary: '#9b87f5',
          protein: '#3182CE',
          carbs: '#ED8936',
          fat: '#ECC94B',
          water: '#63B3ED',
          fiber: '#38B2AC',
          sugar: '#F56565',
          sodium: '#D69E2E'
        },
        cosmic: {
          deep: 'rgb(15, 23, 42)',
          space: 'rgb(30, 41, 59)',
          nebula: 'rgb(124, 58, 237)',
          star: 'rgb(251, 191, 36)',
          accent: 'rgb(236, 72, 153)',
          highlight: 'rgb(6, 182, 212)'
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
        'highlight': '0 0 20px rgba(124, 58, 237, 0.6)',
        'glow': '0 0 25px rgba(6, 182, 212, 0.7)',
        'rainbow': '0 5px 20px rgba(155, 135, 245, 0.5), 0 12px 30px rgba(79, 209, 197, 0.4)',
        'intense': '0 10px 30px rgba(0, 0, 0, 0.2), 0 0 10px rgba(124, 58, 237, 0.5)',
        'cosmic': '0 8px 32px rgba(15, 23, 42, 0.3), 0 4px 16px rgba(124, 58, 237, 0.2)',
        'cosmic-glow': '0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(6, 182, 212, 0.3)',
        'prismatic': '0 5px 20px rgba(236, 72, 153, 0.5), 0 12px 30px rgba(6, 182, 212, 0.4)',
        'nebula': '0 8px 20px rgba(124, 58, 237, 0.3), 0 6px 12px rgba(15, 23, 42, 0.5)',
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
            boxShadow: '0 0 10px rgba(124, 58, 237, 0.6), 0 0 20px rgba(124, 58, 237, 0.2)' 
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.8), 0 0 30px rgba(124, 58, 237, 0.4)' 
          },
        },
        'cosmic-pulse': {
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
        'nebula-drift': {
          '0%': { 
            transform: 'rotate(0deg) scale(1)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'rotate(180deg) scale(1.2)',
            opacity: '0.6'
          },
          '100%': { 
            transform: 'rotate(360deg) scale(1)',
            opacity: '0.8'
          },
        },
        'prismatic-shift': {
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
        'cosmic-pulse': 'cosmic-pulse 8s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 3s ease-in-out infinite',
        'nebula-drift': 'nebula-drift 30s linear infinite',
        'prismatic-shift': 'prismatic-shift 6s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, rgb(124, 58, 237) 0%, rgb(6, 182, 212) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, rgb(6, 182, 212) 0%, rgb(236, 72, 153) 100%)',
        'gradient-card': 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(249,250,251,0.8) 100%)',
        'gradient-highlight': 'linear-gradient(90deg, rgb(124, 58, 237) 0%, rgb(6, 182, 212) 100%)',
        'gradient-rainbow': 'linear-gradient(90deg, rgb(124, 58, 237), rgb(6, 182, 212), rgb(236, 72, 153), rgb(251, 191, 36))',
        'gradient-neon': 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
        'gradient-sunset': 'linear-gradient(to right, #fa709a, #fee140)',
        'gradient-vapor': 'linear-gradient(to top, #a18cd1, #fbc2eb)',
        'gradient-cosmic': 'linear-gradient(to bottom right, rgb(15, 23, 42), rgb(30, 41, 59), rgb(124, 58, 237))',
        'gradient-aurora': 'linear-gradient(to right, #4ade80, #06b6d4, #8b5cf6)',
        'gradient-nebula': 'radial-gradient(circle at center, rgba(124, 58, 237, 0.8) 0%, rgba(15, 23, 42, 0) 70%)',
        'gradient-space': 'radial-gradient(ellipse at bottom, rgb(30, 41, 59) 0%, rgb(15, 23, 42) 100%)',
        'gradient-star-field': 'radial-gradient(1px 1px at 25px 25px, white, rgba(255, 255, 255, 0)), radial-gradient(1px 1px at 50px 50px, white, rgba(255, 255, 255, 0))',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'glow': 'box-shadow',
        'backdrop': 'backdrop-filter',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'cosmic': 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
