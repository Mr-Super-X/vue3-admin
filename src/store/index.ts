// 文档：https://vuex.vuejs.org/zh/guide/typescript-support.html#%E7%AE%80%E5%8C%96-usestore-%E7%94%A8%E6%B3%95
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

interface IModules {
  [key: string]: object
}

// 加载所有子模块
const modules: IModules = {}
const requireContext = require.context('./modules', false, /\.ts|.js$/)
requireContext.keys().forEach(name => {
  const match = name.match(/^\.\/(.*)\.ts|.js$/)
  const moduleName = match && match[1]
  if (moduleName) {
    modules[moduleName] = requireContext(name).default
  }
})

const state = {}

const getters = {}

const mutations = {}

const actions = {}

export interface State {
  [key: string]: any
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules,
  state,
  getters,
  mutations,
  actions
})

// 定义自己的 `useStore` 组合式函数提供ts类型化支持
export function useStore () {
  return baseUseStore(key)
}
