import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/kb_skeleton_Project/src',
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, __dirname + "/src") },
    ],
  },
  optimizeDeps: {
    include: ['vue-chartjs']
  }
})
