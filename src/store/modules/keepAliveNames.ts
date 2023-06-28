import { defineStore } from 'pinia'

// state 类似组件的data选项，函数形式返回对象
const state = (): KeepAliveNamesState => ({
  keepAliveNames: [],
  cachedViews: [],
})

/**
 * 路由缓存列表
 * @methods setCacheKeepAlive 设置要缓存的路由 names（开启 Tagsview）
 * @methods addCachedView 添加要缓存的路由 names（关闭 Tagsview）
 * @methods delCachedView 删除要缓存的路由 names（关闭 Tagsview）
 * @methods delOthersCachedViews 右键菜单`关闭其它`，删除要缓存的路由 names（关闭 Tagsview）
 * @methods delAllCachedViews 右键菜单`全部关闭`，删除要缓存的路由 names（关闭 Tagsview）
 */
const actions = {
  async setCacheKeepAlive(data: Array<string>) {
    this.keepAliveNames = data
  },
  async addCachedView(view: any) {
    if (view.meta.isKeepAlive) this.cachedViews?.push(view.name)
  },
  async delCachedView(view: any) {
    const index = this.cachedViews.indexOf(view.name)
    index > -1 && this.cachedViews.splice(index, 1)
  },
  async delOthersCachedViews(view: any) {
    if (view.meta.isKeepAlive) this.cachedViews = [view.name]
    else this.cachedViews = []
  },
  async delAllCachedViews() {
    this.cachedViews = []
  },
}

// 传入2个参数，定义store并导出
// 第一个参数唯一不可重复，string类型，作为仓库ID以区分仓库
// 第二个参数，以对象形式配置仓库的state,getters,actions
// 配置 state getters actions
export const useKeepAliveNamesStore = defineStore('keepAliveNames', {
  state,
  actions,
})
