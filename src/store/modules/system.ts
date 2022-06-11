export interface IState {
  keepAliveIncludes: string[]
}

const state: IState = {
  keepAliveIncludes: []
}

const getters = {}

const mutations = {
  setKeepAliveIncludes (state: IState) {
    console.log(state)
  }
}

const actions = {
  setKeepAliveIncludes (context: any) {
    context.commit('setKeepAliveIncludes')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
