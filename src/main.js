import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/font/iconfont.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

//引入UE富文本编辑器
import '../static/UeEditor/ueditor.config.js'
import '../static/UeEditor/ueditor.all.min.js'
import '../static/UeEditor/lang/zh-cn/zh-cn.js'
import '../static/UeEditor/ueditor.parse.min.js'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { size: 'mini' })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
