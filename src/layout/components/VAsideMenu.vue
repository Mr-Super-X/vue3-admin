<!--
 * @Description: 侧边导航栏组件，用于渲染路由tree
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:11:16
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-20 11:19:45
 * @FilePath: \vue3-admin\src\layout\components\VAsideMenu.vue
-->

<template>
  <el-menu
    mode="vertical"
    background-color="transparent"
    :default-active="$route.path"
    :collapse="isCollapse"
    :unique-opened="getThemeConfig.isUniqueOpened"
    :collapse-transition="false"
    router
  >
    <v-aside-menu-item v-for="item in menuList" :key="item.id" :item="item" />
  </el-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouteStore } from '@store/modules/route'
import { useThemeConfigStore } from '@store/modules/themeConfig'
import { storeToRefs } from 'pinia'

// 引入组件
import VAsideMenuItem from './VAsideMenuItem.vue'

// 定义变量内容
const routeStore = useRouteStore()
const themeConfigStore = useThemeConfigStore() // 布局配置store
const { themeConfig } = storeToRefs(themeConfigStore)
const menuList = ref([]) // 菜单

// 将过滤后的菜单赋值
menuList.value = routeStore.routesTree

const isCollapse = computed(() => themeConfig.value.isCollapse)
// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value
})
</script>
