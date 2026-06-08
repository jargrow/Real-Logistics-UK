import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
  },
  build: {
    // Target broad browser support so esbuild converts CSS Logical Properties
    // (padding-inline, padding-block, margin-inline, etc.) to physical equivalents.
    // Tailwind v4 uses logical properties by default; Edge has inconsistent support.
    cssTarget: ['chrome79', 'edge79', 'firefox70', 'safari13'],
  },
})
