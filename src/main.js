import Vue from 'vue'
import App from './App.vue'
// 引入通用样式
import './styles/base.less'
// 引入字体图标样式
import './styles/iconfont.less'

// 引入rem模板，自动适配屏幕，要先下载npm i lib-flexiable
import 'lib-flexible'

// 引入路由对象 关联router实列和vue实例
import router from './router'
import Axios from 'axios'

import axios from 'axios'
// ------------------------------------------------以下是全局组件
// 引入头部作为组件
import hmheader from './components/hmheader.vue'
// 引入logo组件
import hmlogo from './components/hmlogo.vue'
// 引入按钮组件
import hmbutton from './components/hmbutton.vue'

// 引入输入框
import hminput from './components/hminput.vue'

// 引入导航条模板
import hmnavbar from './components/hmnavbar.vue'

// 把导航条全局

Vue.component('hmnavbar1', hmnavbar)

// 把输入框全局组件
Vue.component('hminput', hminput)

// 把头部全局组件
Vue.component('hmheader', hmheader)
// 把logo全局组件
Vue.component('hmlogo', hmlogo)
// 把按钮全局组件
Vue.component('hmbutton', hmbutton)

// 按需加载的方式vant-ui处理（我们使用按需加载，想要使用就直接在组件里使用）
import {
  Button,
  Field,
  Toast,
  Dialog,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Uploader,
  List
} from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)

axios.defaults.baseURL = 'http://localhost:3000'
// ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！请求拦截 就是所有的请求都先要经过它
axios.interceptors.request.use(function(config) {
  // console.log('拦截前的信息', config)

  const token = localStorage.getItem('token')
  config.headers.Authorization = token
  // console.log('拦截后', config)
  return config
})

// ！！！！！！！！！！响应拦截
// 配置axios响应拦截，所有的响应都要先经过这个拦截响应，所以就算有假的token或者过期的token也是在这
axios.interceptors.response.use(function(res) {
  // console.log('拦截到了res', res)
  // 对tokne处理
  const { statusCode, message } = res.data

  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    // 并且删除
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    Toast.fail(message)
  }
  return res
})

Vue.prototype.$axios = axios

// 全局过滤器
import moment from 'moment'

Vue.filter('date', function(input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
