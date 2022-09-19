<!--
 * @Description: 侧边导航栏组件，用于渲染路由tree
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:11:16
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-08-08 17:45:43
 * @FilePath: \vue3-admin\src\layout\components\VAsideMenu.vue
-->

<template>
  <div class="menu-container" :style="{ width: scrollbarWidth + 'px' }">
    <el-scrollbar>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@store/modules/app'
import { getMenu, postMenuTest } from '../apis'
import type { IListItem } from '../types/index.d'
import VAsideMenuItem from './VAsideMenuItem.vue'
import style from '@styles/scss/variables.scss'

const appStore = useAppStore()

const isCollapse = computed(() => appStore.getIsCollapse)
const scrollbarWidth = computed(() => (isCollapse.value ? 54 : 210))

const menu = ref<IListItem[]>([])
const menuColor = computed(() => style['menu-color'])
const menuBackground = computed(() => style['menu-background'])
const menuColorActive = computed(() => style['menu-color-active'])

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
