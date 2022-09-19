<!--
 * @Description: 系统Layout布局组件入口，存放基本布局结构
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-19 12:37:18
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-08-08 14:16:39
 * @FilePath: \vue3-admin\src\layout\index.vue
-->

<template>
  <el-config-provider :size="config.size" :z-index="config.zIndex" :locale="config.locale">
    <el-container class="layout">
      <v-aside />
      <el-container class="layout-container">
        <v-header />
        <v-main />
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import en from "element-plus/lib/locale/lang/en";
import VAside from './components/VAside.vue'
import VHeader from './components/VHeader.vue'
import VMain from './components/VMain.vue'

const config = reactive({
  locale: zhCn,
  zIndex: 3000,
  size: 'small',
})
</script>

<style scoped lang="scss">
.layout {
  height: 100%;

  &-container {
    flex-direction: column;
  }
}
</style>
