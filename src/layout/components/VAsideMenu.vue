<!--
 * @Description: 侧边导航栏组件，用于渲染路由tree
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:11:16
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-14 17:13:10
 * @FilePath: \vue3-admin\src\layout\components\VAsideMenu.vue
-->

<template>
  <el-scrollbar class="menu-container" :style="{ width: scrollbarWidth + 'px' }">
    <el-menu
      mode="vertical"
      class="el-menu-vertical"
      background-color="transparent"
      :default-active="$route.path"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
    >
      <v-aside-menu-item v-for="item in menuList" :key="item.id" :item="item" />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@store/modules/app'
import { useRouteStore } from '@store/modules/route'

// 引入组件
import VAsideMenuItem from './VAsideMenuItem.vue'

// 定义变量内容
const appStore = useAppStore()
const routeStore = useRouteStore()
const menuList = ref([]) // 菜单

// 将过滤后的菜单赋值
menuList.value = routeStore.routesTree

const isCollapse = computed(() => appStore.getIsCollapse)
const scrollbarWidth = computed(() => (isCollapse.value ? 54 : 210))
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
