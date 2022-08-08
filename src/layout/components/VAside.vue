<!--
 * @Description: Layout左侧布局组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-19 12:37:18
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-08-08 11:35:02
 * @FilePath: \vue3-admin\src\layout\components\VAside.vue
-->

<template>
  <div class="aside-container">
    <v-aside-logo />
    <v-aside-menu />
  </div>
</template>

<script setup lang="ts">
import VAsideLogo from './VAsideLogo.vue'
import VAsideMenu from './VAsideMenu.vue'
</script>

<style lang="scss" scoped></style>
