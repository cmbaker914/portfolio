import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// `base` must match the GitHub Pages project path (https://cmbaker914.github.io/portfolio/).
// Only applied to the production build so `vite dev` keeps serving from root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/portfolio/' : '/',
  plugins: [vue()],
}))
