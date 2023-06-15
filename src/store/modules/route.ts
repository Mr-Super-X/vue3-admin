import { defineStore } from 'pinia'
import { MODULE_ID } from '@constant/index'

export interface RoutesListState<T = any> {
  routesTree: T[]
  filterHideRoutesTree: T[]
}

// 递归过滤掉route.meta.isHide为true的数据
const filterRoutesFn = arr => {
  return arr
    .filter(item => !item.meta?.isHide)
    .map(item => {
      item = Object.assign({}, item)
      if (item.children) item.children = filterRoutesFn(item.children)
      return item
    })
}

// state 类似组件的data选项，函数形式返回对象
const state = (): RoutesListState => ({
  routesTree: [], // 路由树（完整的数据）
  filterHideRoutesTree: [], // 路由树（过滤掉meta.isHide为true的数据）
})

const getters = {}

const actions = {
  async setRoutesTree(data: Array<string>) {
    this.routesTree = data
  },
  async setFilterHideRoutesTree(data: Array<string>) {
    this.routesTree = filterRoutesFn(data)
  },
}

// 传入2个参数，定义store并导出
// 第一个参数唯一不可重复，string类型，作为仓库ID以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// 配置 state getters actions
export const useRouteStore = defineStore(MODULE_ID.ROUTE, {
  state,
  getters,
  actions,
})
