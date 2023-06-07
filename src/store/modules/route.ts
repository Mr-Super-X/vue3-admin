import { defineStore } from 'pinia'
import { MODULE_ID } from '@constant/index'

export interface RoutesListState<T = any> {
  routesList: T[]
}

// state 类似组件的data选项，函数形式返回对象
const state = (): RoutesListState => ({
  routesList: [],
})

const getters = {}

const actions = {
  async setRoutesList(data: Array<string>) {
    this.routesList = data
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
