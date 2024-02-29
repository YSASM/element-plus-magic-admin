import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// vs code 编辑器配置
// import monacoEditorPlugin from 'vite-plugin-monaco-editor'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true, // 打包时先清空上一次构建生成的目录
    // outDir: "distp", //指定输出路径
    // assetsDir: "static/img/", // 指定生成静态资源的存放路径
    chunkSizeWarningLimit: 5000, // 消除打包大小超过500kb警告
    minify: "terser", // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: {
      compress: {
        keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
        // drop_console: true, // 生产环境去除 console
        // drop_debugger: true, // 生产环境去除 debugger
      },
      // format: {
      //   comments: false, // 删除注释
      // },
    },
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
        },
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: "static/js/[name]-[hash].js",
        
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: "static/js/[name]-[hash].js", //js文件放到一个文件夹
        // chunkFileNames: (chunkInfo) => { // 拆分js到对应模块文件夹
        //   const facadeModuleId = chunkInfo.facadeModuleId
        //     ? chunkInfo.facadeModuleId.split("/")
        //     : [];
        //   const fileName =
        //     facadeModuleId[facadeModuleId.length - 2] || "[name]";
        //   return `static/js/${fileName}/[name].[hash].js`;
        // },

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
    // (monacoEditorPlugin as { default?: any }).default({
    //   languageWorkers: ['json']
    // }),
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
