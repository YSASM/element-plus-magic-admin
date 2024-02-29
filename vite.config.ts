import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// vs code 编辑器配置
import monacoEditorPlugin from 'vite-plugin-monaco-editor'
// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  build: {
    chunkSizeWarningLimit: 5000, // 消除打包大小超过500kb警告
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    (monacoEditorPlugin as { default?: any }).default({
      languageWorkers: ['json']
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 4000,
    open: true,
    proxy: {
      '/bid': {
        target: 'http://bid3.batiao8.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bid/, ''),
      },
      '/jzapi': {
        target: 'http://jz.batiao8.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jzapi/, ''),
      },
      '/kctapi': {
        target: 'http://kct3.batiao8.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kctapi/, ''),
      },
      '/mbtiapi': {
        target: 'http://192.168.2.16:9269',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mbtiapi/, ''),
      },
      '/jgapi': {
        target: 'http://aiw.batiao8.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jgapi/, ''),
      },
    }
  }
})
