import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/**/*'],
      exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        chart: resolve(__dirname, 'src/chart.ts'),
        qrcode: resolve(__dirname, 'src/qrcode.ts'),
        virtuallist: resolve(__dirname, 'src/virtuallist.ts'),
        editor: resolve(__dirname, 'src/editor.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react-hook-form',
        'apexcharts',
        'qrcode',
        '@tanstack/react-virtual',
        '@tiptap/react',
        '@tiptap/starter-kit',
        '@tiptap/extension-link',
        '@tiptap/extension-placeholder',
        '@tiptap/extension-underline',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    sourcemap: true,
  },
})
