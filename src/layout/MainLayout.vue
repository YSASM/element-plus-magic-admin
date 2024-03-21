<template>
   <div class="main flex-row">
      <div class="left-routes">
         <RoutesLayout :routeNow="routeNow"></RoutesLayout>
      </div>
      <div class="right-content flex-col">
         <TopLayout class="top-bar"></TopLayout>
         <transition name="fade" mode="out-in">
            <router-view class="content" v-if="!isReloading" />
         </transition>

      </div>
   </div>
</template>

<script lang="ts">
import RoutesLayout from "@/layout/RoutesLayout.vue"
import TopLayout from "@/layout/TopLayout.vue"
import utils from "@/utils"
import { watch } from "vue"
import { useRouter } from "vue-router"

export default {
   data() {
      let timer: any = null
      const routeNow = utils.getPathName()
      return {
         isReloading: false,
         timer,
         routeNow
      }
   },
   components: {
      RoutesLayout,
      TopLayout
   },
   created() {
      const router = useRouter()
      watch(
         () => router.currentRoute.value,
         (newValue: any) => {
            this.routeNow = newValue.fullPath
            this.reload()
         },
         { immediate: true }
      )
      console.log(" ......................阿弥陀佛......................\n" +
         "                       _oo0oo_                      \n" +
         "                      o8888888o                     \n" +
         "                      88\" . \"88                     \n" +
         "                      (| -_- |)                     \n" +
         "                      0\\  =  /0                     \n" +
         "                   ___/‘---’\\___                   \n" +
         "                  .' \\|       |/ '.                 \n" +
         "                 / \\\\|||  :  |||// \\                \n" +
         "                / _||||| -卍-|||||_ \\               \n" +
         "               |   | \\\\\\  -  /// |   |              \n" +
         "               | \\_|  ''\\---/''  |_/ |              \n" +
         "               \\  .-\\__  '-'  ___/-. /              \n" +
         "             ___'. .'  /--.--\\  '. .'___            \n" +
         "         .\"\" ‘<  ‘.___\\_<|>_/___.’>’ \"\".          \n" +
         "       | | :  ‘- \\‘.;‘\\ _ /’;.’/ - ’ : | |        \n" +
         "         \\  \\ ‘_.   \\_ __\\ /__ _/   .-’ /  /        \n" +
         "    =====‘-.____‘.___ \\_____/___.-’___.-’=====     \n" +
         "                       ‘=---=’                      \n" +
         "                                                    \n" +
         "....................佛祖保佑 ,永无BUG...................")
   },
   methods: {
      reload() {
         this.isReloading = true
         this.$nextTick(() => [
            this.isReloading = false
         ])
      }
   }
}
</script>

<style lang="scss" scoped>
.main {
   width: 100vw;
   height: 100vh;

   .left-routes {
      height: 100vh;
      width: 200px;
   }

   .right-content {
      vertical-align: top;
      height: 100vh;
      width: calc(100vw - 200px);

      .top-bar {
         height: 60px;
         width: 100%;
      }

      .content {
         flex: 1;
      }
   }
}

.fade-leave,
// 离开前,进入后透明度是1
.fade-enter-to {
   opacity: 1;
   margin-left: auto;
}

.fade-leave-active,
.fade-enter-active {
   transition: all 0.3s; //过度是2秒
}

.fade-leave-to,
.fade-enter {
   opacity: 0;
   margin-left: 500px;
}
</style>