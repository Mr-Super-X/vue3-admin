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

// ElMessage等组件在js中调用无法被自动按需引入插件检测到
// 因此手动全局引入，方便使用
// import { ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/el-message.css'

// 引入mockjs（其他环境下未使用的esmodule会被tree-shaking）
import { mockXHR } from '../mock'
if (verifyENV('mock')) {
  // mock环境下注册所有的mock服务
  mockXHR()
}

export const app = createApp(App)

// vue3不再提供如vue.prototype.$message = ElMessage这种形式来调用
// 使用app.config.globalProperties来代替
// const globalProperties = app.config.globalProperties // 使用全局属性
// globalProperties.$message = ElMessage // 将ElMessage挂载到全局属性上

app.use(pinia).use(router).use(plugins).use(directives).use(components).mount('#app')
