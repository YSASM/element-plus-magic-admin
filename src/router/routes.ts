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
    path: '/user',
    meta: {
      title: '用户管理',
      icon: 'Avatar',
    },
    component: MainLayout,
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
    component: MainLayout,
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
    component: MainLayout,
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
    component: MainLayout,
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
  {
    path: '/system',
    meta: {
      title: '系统管理',
      icon: 'Setting',
    },
    component: MainLayout,
    children: [
      {
        path: "log",
        component: TableLayout,
        meta: {
          title: '操作日志',
          icon: 'SetUp',
        },
      }
    ]
  },
  {
    meta: {
      title: '提示词管理',
      icon: 'ChatSquare',
      range: ['/jgapi']
    },
    component: MainLayout,
    path: '/prompt',
    children: [
      {
        path: 'prompt',
        name: 'prompt',
        component: TableLayout,
        meta: {
          title: '提示词管理',
          icon: 'ChatSquare',
        },
      }
    ],
  },
]

export default routes