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

// 把输入框全局组件
Vue.component('hminput', hminput)

// 把头部全局组件
Vue.component('hmheader', hmheader)
// 把logo全局组件
Vue.component('hmlogo', hmlogo)
// 把按钮全局组件
Vue.component('hmbutton', hmbutton)

axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// //===============vant-ui处理（我们使用按需加载，想要使用就直接在组件里使用）
import { Button, Toast } from 'vant'
Vue.use(Button)
Vue.use(Toast)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
