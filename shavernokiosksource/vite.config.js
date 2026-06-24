import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  // Relative base so the build works whether it's served from a domain root
  // or a GitHub Pages project subpath (https://user.github.io/<repo>/).
  base: './',
  plugins: [vue()],
  server: { host: true, port: 5173 }
})
