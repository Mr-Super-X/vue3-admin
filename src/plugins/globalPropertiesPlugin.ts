// 使用app.config.globalProperties插件
import { app } from '@/main'
// ElMessage等组件在js中调用无法被自动按需引入插件检测到
// 因此手动全局引入，方便使用
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const globalPropertiesPlugin = {
  install() {
    // vue3不再提供如vue.prototype.$message = ElMessage这种形式来调用
    // 使用app.config.globalProperties来代替
    const globalProperties = app.config.globalProperties // 使用全局属性
    globalProperties.$message = ElMessage // 将ElMessage挂载到全局属性上
  },
}

export default globalPropertiesPlugin
