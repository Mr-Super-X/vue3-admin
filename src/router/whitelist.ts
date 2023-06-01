import { RouteRecordName } from 'vue-router'
import dynamicRoutes from './dynamicRoutes' // 引入动态路由

/**
 * 该文件用于管理路由白名单，我们本地开发时经常需要调试新增的路由，如果是后端接口管理路由，
 * 还需要额外再去配置，但有了白名单功能后，只需要运行npm run dev:debug命令即可直接查看路由页面
 *
 * 原理为获取所有的路由name（必须要在路由配置中填写name字段），然后在路由拦截中判断调试模式是否为
 * debug模式，命中后则不对匹配的路由name做权限控制
 */
const whitelist: Array<RouteRecordName> = dynamicRoutes.map(item => item.name)

export default whitelist
