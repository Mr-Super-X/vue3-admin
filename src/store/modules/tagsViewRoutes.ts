import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { Session } from '@utils/storage'
import router from '@router/index'

// state 类似组件的data选项，函数形式返回对象
const state = (): TagsViewRoutesState => ({
  tagsViewRoutes: [], // 路由标签列表
  isTagsViewCurrentFull: false, // 是否全屏main区域
})

const actions = {
  /**
   * 获取初始 TagsView 路由列表（meta.isAffix为true的项可视为需要默认显示的）
   * @returns array 返回处理好的数组
   */
  getInitTagsViewRoutes() {
    // router.getRoutes得到的数据为一维数组，可以直接使用
    const routes = router.getRoutes()
    const result = routes.filter(v => v.meta?.isAffix === true)
    return result
  },
  /**
   * 设置 TagsView 路由列表
   * @param data array 路由数据
   */
  async setTagsViewRoutes(data: Array<RouteRecordRaw>) {
    this.tagsViewRoutes = data
  },
  /**
   * 设置开启/关闭全屏时的 boolean 状态
   * @param bool boolean
   */
  setCurrentFullscreen(bool: Boolean) {
    Session.set('isTagsViewCurrentFull', bool)
    this.isTagsViewCurrentFull = bool
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
