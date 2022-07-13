<!--
 * @Description: 侧边导航栏组件，用于渲染路由tree
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:11:16
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-07-13 22:17:37
 * @FilePath: \vue3-admin\src\layout\components\VAsideMenu.vue
-->

<template>
  <el-scrollbar class="menu-container">
    <el-menu
      mode="vertical"
      default-active="1"
      class="el-menu-vertical"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu v-for="(item, idx) in menu" :key="item.id" :index="idx + item.id">
        <template #title>
          <el-icon>
            <!-- <location /> -->
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getMenu } from '../apis'
import type { IListItem } from '@/types/index.d'

const isCollapse = ref(false)
const menu = ref<IListItem[]>([])

getMenu()
  .then(res => {
    return res?.data?.data
  })
  .then(data => {
    console.log(data)
    menu.value = data.list
  })

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.menu-container {
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
