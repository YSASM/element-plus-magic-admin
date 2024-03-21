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
  base: "./",
  build: {
    emptyOutDir: true, // 打包时先清空上一次构建生成的目录
    chunkSizeWarningLimit: 5000, // 消除打包大小超过500kb警告
    rollupOptions: {
      //体积太大，模块拆分
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
          if (id.includes("src")) {
            if (id.toString().split("src/")[1].split("/").length >= 2) {
              const temp = id
              .toString()
              .split("src/")[1]
              .split(".")
              if(temp[1].toString()==="ts"){
                return temp[0].toString()
              }
            }
          }
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: "static/js/[name].js",
        chunkFileNames: (chunkInfo) => { // 拆分js到对应模块文件夹
          if (chunkInfo.facadeModuleId && /\/src\//.test(chunkInfo.facadeModuleId) && !/\/node_modules\//.test(chunkInfo.facadeModuleId)) {
            return `static/js/main/${chunkInfo.facadeModuleId.split("/src/")[1].split(".")[0]}/[name].js`;
          }
          if (chunkInfo.name) {
            if(/\//.test(chunkInfo.name)){
              return `static/js/main/${chunkInfo.name}/[name].js`;
            }
            return `static/js/node_modules/${chunkInfo.name}/[name].js`;
          }
          return `static/js/un_know/[name]/[name].[hash].js`;
        },

        // 用于输出静态资源的命名，[ext]表示文件扩展名
        // assetFileNames: "static/[ext]/[name]-[hash].[ext]",  //根据拓展名拆分文件夹
        assetFileNames: (assetInfo) => {
          //根据类型拆分文件夹
          const info = assetInfo.name!.split(".");
          let extType = info[info.length - 1];
          if (
            /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name!)
          ) {
            extType = "media";
          } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name!)) {
            extType = "img";
          } else if (
            /\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name!)
          ) {
            extType = "fonts";
          }
          return `static/${extType}/[name]-[hash][extname]`;
        },
      },
    },
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
      languageWorkers: ['json','html']
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
      '/api': {
        target: 'http://xxx.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
})
