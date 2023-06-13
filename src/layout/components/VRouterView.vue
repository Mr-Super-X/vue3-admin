<template>
  <div class="layout-router-view">
    <router-view v-slot="{ Component }">
      <transition :name="setTransitionName" mode="out-in">
        <keep-alive :include="keepAliveIncludes">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSystemStore } from '@store/modules/system'
import { storeToRefs } from 'pinia'
import { useThemeConfig } from '@store/modules/themeConfig'

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
</script>

<style scoped></style>
