<!--
 * @Description: Layout左侧布局组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-19 12:37:18
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-15 18:03:29
 * @FilePath: \vue3-admin\src\layout\components\VAside.vue
-->

<template>
  <el-aside class="layout-aside" :class="setAsideCollapseClass">
    <v-aside-logo v-if="themeConfig.isShowLogo" />
    <el-scrollbar class="layout-menu-scrollbox flex-auto">
      <v-aside-menu />
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeConfigStore } from '@store/modules/themeConfig'
import { storeToRefs } from 'pinia'

// 引入组件
import VAsideLogo from './VAsideLogo.vue'
import VAsideMenu from './VAsideMenu.vue'

// 定义变量内容
const themeConfigStore = useThemeConfigStore() // 布局配置store
const { themeConfig } = storeToRefs(themeConfigStore)

// 设置菜单展开/收起时的宽度
const setAsideCollapseClass = computed(() => {
  const { isCollapse } = themeConfig.value
  if (isCollapse) return ['layout-aside-pc-64']
  else return ['layout-aside-pc-220']
})
</script>
