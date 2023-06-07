import type { IMockItem } from '../index.d'
import dynamicRoutes from '@router/dynamicRoutes' // 引入动态路由

export const mockMenuList: Array<IMockItem> = [
  // 获取左侧菜单栏数据
  {
    url: '/route/menu',
    method: 'get',
    response() {
      return {
        code: 200,
        msg: '成功',
        data: {
          // 用dynamicRoutes来模拟真实数据
          list: dynamicRoutes,
        },
      }
    },
  },
]
