import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'normalize.css' // 保持各浏览器样式统一
import '@css/reset.css' // 重置样式
import '@css/common.css' // 引入公共样式

import { mockXHR } from './mock' // 引入mockjs（其他环境下未使用的esmodule会被tree-shaking）
if (process.env.VUE_APP_TITLE === 'mock环境') {
  // mock环境下注册所有的mock服务
  mockXHR()
}

createApp(App).use(store).use(router).mount('#app')
