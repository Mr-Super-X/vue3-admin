<!--
 * @Description: 系统Layout布局组件入口，存放基本布局结构
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-19 12:37:18
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-07-25 11:36:28
 * @FilePath: \vue3-admin\src\layout\index.vue
-->

<template>
  <el-config-provider :size="config.size" :z-index="config.zIndex" :locale="config.locale">
    <el-container class="layout-container">
      <v-aside />
      <el-container class="layout-container-view h100">
        <v-header />
        <v-main />
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElConfigProvider } from 'element-plus'
import { useThemeConfigStore } from '@store/modules/themeConfig'
import { storeToRefs } from 'pinia'
// import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from "element-plus/lib/locale/lang/en";

// 引入组件
import VAside from './components/VAside.vue'
import VHeader from './components/VHeader.vue'
import VMain from './components/VMain.vue'

// 定义变量内容
const config = ref({
  // locale: zhCn,
  zIndex: 3000,
  size: 'small',
})
const themeConfigStore = useThemeConfigStore() // 布局配置store
const { themeConfig } = storeToRefs(themeConfigStore)

// 获取布局配置信息
const getThemeConfig = computed(() => {
  return themeConfig.value
})

// 设置界面主题色
const setThemeColor = () => {
  const html = document.documentElement as HTMLElement
  if (getThemeConfig.value.isDark) html.setAttribute('data-theme', 'dark')
  else html.setAttribute('data-theme', '')
}

onMounted(() => {
  // 下一次宏任务执行，防止一些不到位的渲染
  setTimeout(() => {
    setThemeColor()
  }, 0)
})
</script>

<style lang="scss">
@use './styles/index.scss' as *;
</style>
