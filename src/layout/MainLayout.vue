<template>
   <div class="main flex-row">
      <div class="left-routes">
         <RoutesLayout :routeNow="routeNow"></RoutesLayout>
      </div>
      <div class="right-content flex-col">
         <TopLayout class="top-bar"></TopLayout>
         <router-view class="content" v-if="!isReloading" />
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
      return {
         isReloading: false,
         timer
      }
   },
   setup() {
      const routeNow = utils.getPathName()
      return {
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
</style>