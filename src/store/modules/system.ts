// 引入store定义函数
import { defineStore } from 'pinia'
export interface IState {
  keepAliveIncludes: string[]
}

// state 类似组件的data选项，函数形式返回对象
const state = (): IState => ({
  keepAliveIncludes: []
})

const getters = {}

const actions = {}

// 传入2个参数，定义store并导出
// 第一个参数唯一不可重复，string类型，作为仓库ID以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// 配置 state getters actions
export const useSystemStore = defineStore('system', {
  state,
  getters,
  actions
})
