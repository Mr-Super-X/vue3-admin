<!--
 * @Description: Layout头部导航栏布局组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-19 12:37:18
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-15 10:35:28
 * @FilePath: \vue3-admin\src\layout\components\VHeader.vue
-->

<template>
  <el-header class="layout-header">
    <v-header-nav />
    <v-header-tags />
  </el-header>
</template>

<script setup lang="ts">
import VHeaderNav from './VHeaderNav.vue'
import VHeaderTags from './VHeaderTags.vue'
</script>
