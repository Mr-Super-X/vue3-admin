<!--
 * @Description: 侧边导航栏组件，用于渲染路由tree
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:11:16
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-09 11:27:23
 * @FilePath: \vue3-admin\src\layout\components\VAsideMenu.vue
-->

<template>
  <el-scrollbar class="menu-container" :style="{ width: scrollbarWidth + 'px' }">
    <el-menu
      mode="vertical"
      class="el-menu-vertical"
      :default-active="$route.path"
      :collapse="isCollapse"
      :text-color="menuColor"
      :background-color="menuBackground"
      :active-text-color="menuColorActive"
      :collapse-transition="false"
      router
    >
      <v-aside-menu-item v-for="item in menu" :key="item.id" :item="item" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@store/modules/app'
import { getMenu, postMenuTest } from '../apis'
import type { IListItem } from '../types/index.d'
import VAsideMenuItem from './VAsideMenuItem.vue'
import style from '@styles/scss/variables.scss'
import { useRouteStore } from '@store/modules/route'

const appStore = useAppStore()
const routeStore = useRouteStore()
// console.log(routeStore.routesList)

const menuList = ref([])

// 生成嵌套菜单
function transformData(modules, routes) {
  // 构造父子层级结构的对象数组（即树）
  const result = []
  for (const item of modules) {
    const paths = item.path.split('/').filter(path => path !== '')
    let parent = null
    let parentChildren = result
    for (const path of paths) {
      let node = parentChildren.find(node => node.path === `/${path}`)
      if (!node) {
        node = {
          path: `/${path}`,
          children: [],
        }
        parentChildren.push(node)
      }
      parent = node
      parentChildren = node.children
    }
  }
  // 递归地遍历输入的routes对象，将它的子节点加入到构造好的树中的对应节点的children属性里
  function buildTree(node, parent, parentData) {
    if (!parentData[parent]) {
      return
    }
    for (const key in parentData) {
      if (key !== parent) {
        const parentPath = parentData[parent].path
        const [_, path] = key.split('/')
        if (parentPath === `/${path}`) {
          const childNode = node.children.find(child => child.path === parentData[key].path)
          if (childNode) {
            buildTree(childNode, key, parentData)
          }
        }
      }
    }
  }
  for (const node of result) {
    buildTree(node, '', routes)
  }
  return result
}

// 路由过滤递归函数
const filterRoutesFun = arr => {
  return arr
    .filter(item => !item.meta?.isHide)
    .map(item => {
      item = Object.assign({}, item)
      if (item.children) item.children = filterRoutesFun(item.children)
      return item
    })
}

menuList.value = filterRoutesFun(routeStore.routesList)
// console.log(menuList)

const isCollapse = computed(() => appStore.getIsCollapse)
const scrollbarWidth = computed(() => (isCollapse.value ? 54 : 210))

const menu = ref<IListItem[]>([])
const menuColor = computed(() => style['menu-color'])
const menuBackground = computed(() => style['menu-background'])
const menuColorActive = computed(() => style['menu-color-active'])

// getMenu({}, { headers: {} }).then(data => {
//   console.log(data)
//   menu.value = data.list
// })

// postMenuTest({}, { headers: { a: '1' } })
//   .then(res => {
//     return res?.data?.data
//   })
//   .then(data => {
//     console.log('getMenuTest', data)
//   })
</script>

<style scoped lang="scss">
.menu-container {
  flex: 1;

  .el-scrollbar__wrap {
    height: 100%;
  }

  .el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
  }

  .el-menu {
    border-right: none;
  }
}
</style>
