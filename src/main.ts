import { createApp } from 'vue'
import { verifyENV } from './utils'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css' // 保持各浏览器样式统一
import '@css/reset.css' // 重置样式
import '@css/common.css' // 引入公共样式
import './router/permission' // 引入路由权限拦截

import { mockXHR } from '../mock' // 引入mockjs（其他环境下未使用的esmodule会被tree-shaking）
if (verifyENV('mock')) {
  // mock环境下注册所有的mock服务
  mockXHR()
}

const app = createApp(App)

app.use(store).use(router).mount('#app')
