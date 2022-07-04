import { createApp } from 'vue' // 创建vue实例函数
import { verifyENV } from './utils' // 验证环境函数
import App from './App.vue' // 入口vue组件
import pinia from './store' // store
import router from './router' // 路由
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

app.use(pinia).use(router).use(components).mount('#app')
