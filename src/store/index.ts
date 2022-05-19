import { createStore } from 'vuex';

// 加载所有子模块
const modules = {};
/* const requireContext = require.context('./', true, /index\.js$/);
requireContext.keys().forEach((name) => {
  let _matchRes = name.match(/^\.\/(.*)\/index\.js$/);
  if (_matchRes && _matchRes.length > 0) {
    if (_matchRes[1]) {
      modules[_matchRes[1]] = requireContext(name).default;
    }
  }
}); */

const state = {};

const getters = {};

const mutations = {};

const actions = {};

export default createStore({
  modules,
  state,
  getters,
  mutations,
  actions,
});
