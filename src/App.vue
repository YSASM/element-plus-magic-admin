<template>
   <router-view v-if="hideMain && !isReloading" />
   <div v-else class="main flex-row">
      <div class="left-routes">
         <RoutesLayout :routeNow="routeNow" @reload="reload"></RoutesLayout>
      </div>
      <div class="right-content flex-col">
         <TopLayout class="top-bar"></TopLayout>
         <router-view class="content" v-if="!isReloading" />
      </div>
   </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import RoutesLayout from "@/layout/RoutesLayout.vue"
import TopLayout from "@/layout/TopLayout.vue"
import router from "@/router"
</script>

<script lang="ts">
export default {
   data() {
      return {
         isReloading: false,
         hideMain: true,
         routeNow: "/"
      }
   },
   created() {
      router.afterEach(() => {
         this.routeNow = location.pathname
         this.hideMain = this.getHidden()
      })
   },
   methods: {
      getHidden() {
         const router = useRouter()
         return router.currentRoute.value.meta.hidden == true
      },
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