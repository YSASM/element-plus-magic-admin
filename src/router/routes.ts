import type { RouteRecordRaw } from "vue-router"
import TableLayout from '../layout/TableLayout.vue'
import MainLayout from '../layout/MainLayout.vue'
const routes: Array<RouteRecordRaw> = [
  {
    meta: {
      hidden: true
    },
    path: '/login',
    component: () => import("@/views/LoginPage.vue"),
    children: []
  },
  {
    path: '/',
    redirect: '/home',
    component:MainLayout,
    children: [
      {
        path: "home",
        component: () => import("@/views/HomeView.vue"),
        meta: {
          title: '首页',
          icon: 'House',
        },
      }
    ]
  },
  {
    path: '/test',
    meta: {
      title: '测试',
      icon: 'Avatar',
    },
    component: MainLayout,
    children: [
      {
        path: "test1",
        component: TableLayout,
        meta: {
          title: '测试1',
          icon: 'User',
        },
      },
      {
        path: "test2",
        component: TableLayout,
        meta: {
          title: '测试2',
          icon: 'Clock',
        },
      },
      {
        path: 'test3',
        component: TableLayout,
        meta: {
          title: '测试3',
          icon: 'Promotion',
        },
      },
      {
        path: 'test4',
        component: TableLayout,
        meta: {
          title: '测试4',
          icon: 'Promotion',
        },
      },
    ]
  },
]

export default routes