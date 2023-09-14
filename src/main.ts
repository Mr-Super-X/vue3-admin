/*
 * @LastDescription: Multi-Language Support
 * @LastEditors: lllomh
 * @LastContact: admin@lllomh.com
 * @LastEditTime: 2023-09-14 17:53:32
 */
import { createApp } from 'vue' // 创建vue实例函数
import { verifyENV } from './utils' // 验证环境函数
import App from './App.vue' // 入口vue组件
import pinia from './store' // store
import router from './router' // 路由
import components from '@components/index' // 引入全局公共组件
import plugins from './plugins' // 引入全局插件
import directives from './directives' // 引入全局指令

import 'normalize.css' // 保持各浏览器样式统一
import '@styles/css/reset.css' // 重置样式
import '@styles/css/common.css' // 引入公共样式
import '@theme/index.scss' // 引入主题文件
import i18n from '@/lang/i18n' //Import multilingualism package

// 引入mockjs（其他环境下未使用的esmodule会被tree-shaking）
import { mockXHR } from '../mock'
if (verifyENV('mock')) {
  // mock环境下注册所有的mock服务
  mockXHR()
}

export const app = createApp(App)

app.use(pinia).use(router).use(plugins).use(directives).use(components).use(i18n).mount('#app')
