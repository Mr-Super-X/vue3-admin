<!--
 * @Description: 头部导航栏Nav组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:56:55
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-08-08 11:28:16
 * @FilePath: \vue3-admin\src\layout\components\VHeaderNav.vue
-->
<template>
  <div class="nav-container">
    <div class="left-area">
      <v-header-icon-collapse />
      <v-header-breadcrumb />
    </div>
    <div class="right-area">
      <v-header-icon-full-screen />
      <v-header-user />
    </div>
  </div>
</template>

<script setup lang="ts">
import VHeaderBreadcrumb from './VHeaderBreadcrumb.vue'
import VHeaderIconCollapse from './VHeaderIconCollapse.vue'
import VHeaderIconFullScreen from './VHeaderIconFullScreen.vue'
import VHeaderUser from './VHeaderUser.vue'
</script>

<style scoped lang="scss">
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  .left-area,
  .right-area {
    display: flex;
    align-items: center;
    height: 100%;
  }
}
</style>
