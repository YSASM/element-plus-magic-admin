<template>
   <div class="main flex-row">
      <div class="left-routes">
         <RoutesLayout :routeNow="routeNow" @reload="reload"></RoutesLayout>
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

   },
   methods: {
      // getHidden() {
      //    const router = useRouter()
      //    console.log(router.currentRoute.value)
      //    return router.currentRoute.value.meta.hidden === true
      // },
      reload() {
         clearInterval(this.timer)
         this.timer = null
         this.timer = setInterval(() => {
            if (this.routeNow != utils.getPathName()) {
               this.routeNow = utils.getPathName()
               clearInterval(this.timer)
               this.timer = null
               this.isReloading = true
               this.$nextTick(() => [
                  this.isReloading = false
               ])
            }
         }, 100)
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