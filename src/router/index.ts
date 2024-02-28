import { indexStore } from '@/stores'
import router from './routes'



router.beforeEach((to, from, next) => {
  const store = indexStore()
  if(store.$state.token=="" && to.fullPath!="/login"){
    next("/login")
  }
  else{
    next() // 跳转到下一个路由
  }
})

router.beforeResolve((to, from, next) => {
  // 在导航被确认之前的操作
  next()
})

export default router
