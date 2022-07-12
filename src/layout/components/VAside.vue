<!--
 * @Description: Layout左侧布局组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-19 12:37:18
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-05-31 13:33:30
 * @FilePath: \vue3-admin\src\layout\components\VAside.vue
-->

<template>
  <el-aside class="aside-container">
    <v-aside-logo />
    <v-aside-menu />
  </el-aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VAsideLogo from './VAsideLogo.vue'
import VAsideMenu from './VAsideMenu.vue'

export default defineComponent({
  components: {
    VAsideLogo,
    VAsideMenu,
  },
  setup() {
    return {}
  },
})
</script>

<style lang="scss" scoped></style>
