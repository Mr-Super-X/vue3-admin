<!--
 * @Description: 侧边导航栏组件，用于渲染路由tree
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:11:16
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-08-08 14:52:58
 * @FilePath: \vue3-admin\src\layout\components\VAsideMenu.vue
-->

<template>
  <el-scrollbar class="menu-container" :style="{ width: scrollbarWidth + 'px' }">
    <el-menu
      mode="vertical"
      default-active="1"
      class="el-menu-vertical"
      :collapse="!isCollapse"
      @open="handleOpen"
      @close="handleClose"
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

const appStore = useAppStore()

const isCollapse = computed(() => appStore.getIsCollapse)
console.log(isCollapse)
const scrollbarWidth = computed(() => (isCollapse.value ? 210 : 54))

const menu = ref<IListItem[]>([])

getMenu({}, { headers: {} }).then(data => {
  console.log(data)
  menu.value = data.list
})

// postMenuTest({}, { headers: { a: '1' } })
//   .then(res => {
//     return res?.data?.data
//   })
//   .then(data => {
//     console.log('getMenuTest', data)
//   })

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.menu-container {
  overflow: hidden;
  height: calc(100% - 100px);

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
