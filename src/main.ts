import { createApp } from 'vue'
import { store, key } from './store'
import { verifyENV } from './utils'
import App from './App.vue'
import router from './router'
import components from '@components/index' // 引入全局公共组件

import 'normalize.css' // 保持各浏览器样式统一
import '@styles/css/reset.css' // 重置样式
import '@styles/css/common.css' // 引入公共样式

import { mockXHR } from '../mock' // 引入mockjs（其他环境下未使用的esmodule会被tree-shaking）
if (verifyENV('mock')) {
  // mock环境下注册所有的mock服务
  mockXHR()
}

export const app = createApp(App)

app.use(store, key).use(router).use(components).mount('#app')
