<!--
 * @Description: Layout头部导航栏布局组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-19 12:37:18
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-06-02 12:19:34
 * @FilePath: \vue3-admin\src\layout\components\VHeader.vue
-->

<template>
  <el-header class="header-container">
    <v-header-nav />
    <v-header-tags />
  </el-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VHeaderNav from './VHeaderNav.vue'
import VHeaderTags from './VHeaderTags.vue'

export default defineComponent({
  components: {
    VHeaderNav,
    VHeaderTags
  },
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
.header-container {
  background-color: #fff;
  position: relative;
  z-index: 1000;
  height: 80px;
  padding: 0;
  overflow: hidden;
}
</style>
