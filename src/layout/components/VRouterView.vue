<template>
  <div class="layout-router-view">
    <router-view v-slot="{ Component, route }">
      <transition :name="setTransitionName" mode="out-in">
        <!-- Vue 可能会自动复用看起来相似的组件，从而忽略了任何过渡动画。幸运的是，可以添加一个 key 属性来强制过渡。这也允许你在相同路由上使用不同的参数触发过渡 -->
        <!-- 文档：https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%BC%BA%E5%88%B6%E5%9C%A8%E5%A4%8D%E7%94%A8%E7%9A%84%E8%A7%86%E5%9B%BE%E4%B9%8B%E9%97%B4%E8%BF%9B%E8%A1%8C%E8%BF%87%E6%B8%A1 -->
        <!-- 注意：keep-alive 组件中不能包含注释内容，否则 Vue 将无法正确编译 -->
        <keep-alive :include="keepAliveIncludes">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@store/modules/system'
import { storeToRefs } from 'pinia'
import { useThemeConfigStore } from '@store/modules/themeConfig'

// 定义变量
const systemStore = useSystemStore()
// 定义变量内容
const themeConfigStore = useThemeConfigStore()
const { themeConfig } = storeToRefs(themeConfigStore)

// 设置主界面切换动画
const setTransitionName = computed(() => {
  return themeConfig.value.animation
})

// 获取组件缓存列表(name值)
const keepAliveIncludes = computed(() => systemStore.keepAliveIncludes)
</script>

<style scoped></style>
