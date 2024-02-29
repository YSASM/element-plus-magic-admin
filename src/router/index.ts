import { indexStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import TableLayout from '../layout/TableLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      meta: {
        hidden: true
      },
      path: '/login',
      component: import("../views/LoginPage.vue"),
      children: []
    },
    {
      path: '/',
      redirect: '/home',
      children: [
        {
          path: "home",
          component: import("@/views/HomeView.vue"),
          meta: {
            title: '首页',
            icon: 'House',
          },
        }
      ]
    },
    {
      path: '/user',
      meta: {
        title: '用户管理',
        icon: 'Avatar',
      },
      children: [
        {
          path: "list",
          component: TableLayout,
          meta: {
            title: '用户列表',
            icon: 'User',
          },
        },
        {
          path: "event",
          component: TableLayout,
          meta: {
            title: '用户日志',
            icon: 'Clock',
          },
        },
        {
          path: 'pushlog',
          name: 'pushlog',
          component: TableLayout,
          meta: {
            title: '推送日志',
            icon: 'Promotion',
          },
        },
      ]
    },
    {
      meta: {
        title: '商品管理',
        icon: 'ShoppingCart',
      },
      path: '/goods',
      children: [
        {
          path: 'goods',
          component: TableLayout,
          meta: {
            title: '商品管理',
            icon: 'Goods',
          },
        }
      ],
    },
    {
      meta: {
        title: '订单管理',
        icon: 'Money',
      },
      path: '/order',
      children: [
        {
          path: 'order',
          component: TableLayout,
          meta: {
            title: '订单管理',
            icon: 'Wallet',
          },
        }
      ],
    },
    {
      path: '/config',
      meta: {
        title: '配置管理',
        icon: 'Setting',
      },
      children: [
        {
          path: "config",
          component: TableLayout,
          meta: {
            title: '配置列表',
            icon: 'Filter',
          },
        }
      ]
    },
  ]
})


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
