//  配置路由信息

import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import login from '../pages/login.vue'
import register from '../pages/register.vue'
import user from '../pages/user.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/login',
      component: login,
      name: 'login'
    },

    {
      path: '/register',
      component: register,
      name: 'register'
    },

    {
      path: '/user',
      component: user,
      name: 'user'
    }
  ]
})

export default router
