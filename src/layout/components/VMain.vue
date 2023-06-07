<!--
 * @Description: Layout主要区域布局组件，存放业务视图
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-20 13:17:47
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-07 16:56:32
 * @FilePath: \vue3-admin\src\layout\components\VMain.vue
-->

<template>
  <el-main class="main-container">
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <transition :name="setTransitionName" mode="out-in">
          <keep-alive :include="keepAliveIncludes">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useSystemStore } from '@store/modules/system'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@store/modules/themeConfig'
import { NextLoading } from '@utils/loading'

// 定义变量
const systemStore = useSystemStore()
// 定义变量内容
const storesThemeConfig = useThemeConfig()
const { themeConfig } = storeToRefs(storesThemeConfig)

// 设置主界面切换动画
const setTransitionName = computed(() => {
  return themeConfig.value.animation
})

// 获取组件缓存列表(name值)
const keepAliveIncludes = computed(() => systemStore.keepAliveIncludes)

// 组件加载后关闭loading状态，否则会一直转圈
onMounted(() => {
  // 500ms后关闭，让界面有个简单的加载动画
  NextLoading.done(500)
})
</script>

<style scoped lang="scss">
.main-container {
  background-color: #f8f8f8;
  overflow: hidden;

  &.el-main {
    padding: 0;
  }

  ::v-deep(.el-scrollbar__view) {
    padding: 20px;
  }
}
</style>
