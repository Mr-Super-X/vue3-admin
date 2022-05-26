import { createStore } from 'vuex'

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

export default createStore({
  modules,
  state,
  getters,
  mutations,
  actions
})
