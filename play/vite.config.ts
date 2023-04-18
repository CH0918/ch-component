import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// vite.config.ts
import DefineOptions from 'unplugin-vue-define-options/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), DefineOptions(), vueJsx()]
})
