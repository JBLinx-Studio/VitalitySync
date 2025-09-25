
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // Reduce file watcher overhead
      usePolling: false,
      interval: 300,
      binaryInterval: 300,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/dist/**',
        '**/build/**',
        '**/.next/**',
        '**/.nuxt/**',
        '**/.output/**',
        '**/.vercel/**',
        '**/.netlify/**',
        '**/coverage/**',
        '**/.nyc_output/**',
        '**/.cache/**',
        '**/.vscode/**',
        '**/.idea/**',
        '**/tmp/**',
        '**/temp/**',
        '**/*.log',
        '**/.DS_Store',
        '**/Thumbs.db'
      ]
    }
  },
  // Only set base path for production builds
  base: mode === 'production' ? "/VitalitySync/" : "/",
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Optimize dependencies to reduce file watching
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
      'recharts',
      'date-fns',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['fsevents']
  },
  // Prevent excessive file watching
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
}));
