//  配置路由信息

import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import login from '../pages/login.vue'
import register from '../pages/register.vue'
import user from '../pages/user.vue'
import edit from '../pages/edit.vue'
import test from '../pages/test.vue'
import follow from '../pages/follow.vue'
import comments from '../pages/comments.vue'
import star from '../pages/star.vue'

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
    },
    {
      path: '/edit',
      component: edit,
      name: 'edit'
    },
    {
      path: '/test',
      component: test,
      name: 'test'
    },
    {
      path: '/follow',
      component: follow,
      name: 'follow'
    },
    {
      path: '/comments',
      component: comments,
      name: 'comments'
    },
    {
      path: '/star',
      component: star,
      name: 'star'
    }
  ]
})

//   注册全局的导航守卫
// 只要路由发生了跳转,先经过导航守卫
router.beforeEach(function(to, from, next) {
  // to 跳拿去
  // from 从哪来
  // next函数 去指定 或者放

  //  方便后续维护 先定义一个数组
  // 需要授权的路径 需要登录后才能访问的路径
  const authurl = ['/user', '/edit', '/follow', '/comments', '/star']
  const token = localStorage.getItem('token')
  if (authurl.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('./login')
    }
  } else {
    // 去别的地点
    next()
  }
})
export default router
