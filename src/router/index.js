import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films.vue'
import Cinemas from '@/views/Cinemas.vue'
import Login from '@/views/Login.vue'
import Nowplaying from '@/views/films/Nowplaying.vue'
import Comingsoon from '@/views/films/Comingsoon.vue'
import Search from '@/views/Search.vue'
import City from '@/views/City.vue'
import Detail from '@/views/Detail.vue'

Vue.use(VueRouter) // 注册路由插件，两个全局 router-view router-link

// 配置表
const routes = [
  {
    path: '/films',
    component: Films,
    // 嵌套路由
    children: [
      {
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: '/films/comingsoon',
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    name: 'kerwinDetail', // 命名路由
    path: '/detail/:id', // 动态二级路由
    component: Detail
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/center',
    component: () => import('@/views/Center')
  },
  {
    path: '/order',
    component: () => import('@/views/Order')
  },
  {
    path: '/login',
    component: Login
  },
  // 重定向
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
