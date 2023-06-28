import { defineStore } from 'pinia'
import { Session } from '@utils/storage'

// state 类似组件的data选项，函数形式返回对象
const state = (): TagsViewRoutesState => ({
  tagsViewRoutes: [],
  isTagsViewCurrenFull: false,
})

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
const actions = {
  async setTagsViewRoutes(data: Array<string>) {
    this.tagsViewRoutes = data
  },
  setCurrenFullscreen(bool: Boolean) {
    Session.set('isTagsViewCurrenFull', bool)
    this.isTagsViewCurrenFull = bool
  },
}

// 传入2个参数，定义store并导出
// 第一个参数唯一不可重复，string类型，作为仓库ID以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// 配置 state getters actions
export const useTagsViewRoutesStore = defineStore('tagsViewRoutes', {
  state,
  actions,
})
