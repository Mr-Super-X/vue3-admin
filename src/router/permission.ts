import router from './index'
import { getToken, verifyENV } from '../utils/index'
import debugRouters from './debugRouters'
const debug = verifyENV('debug')

// 不用校验的路由，默认不做校验的列表如下
const filterRoutes = ['Login', 'Error']
// 调试模式下把调试路由列表路由添加进去
// 绕过路由权限拦截
if (debug) {
  filterRoutes.push(...debugRouters)
}

// 全局钩子，可以在这里做校验（登录鉴权）
router.beforeEach((to, from, next) => {
  // 获取当前跳转的路由name
  const routeName: any = to.name
  // 不用校验的路由直接跳转即可
  if (filterRoutes.includes(routeName)) {
    next()
    return
  }

  // 找到layout组件
  const isLayout: any = to.matched.length && to.matched[0].name === 'Layout'
  // 获取权限
  const havePermission = getToken() // 以token作为示例
  // 如果是layout下的路由并且有权限才可以正常跳转，否则重定向到login页面
  if (isLayout && havePermission) {
    next()
  } else {
    next('/login')
  }
})
