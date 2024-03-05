import { indexStore } from '@/stores'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const store = indexStore()
  if (store.$state.token == "" && to.fullPath != "/login") {
    next("/login")
  }
  else {
    next()
  }
})
export default router
