<!--
 * @Description: Layout主要区域布局组件，存放业务视图
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-20 13:17:47
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-05-31 13:24:29
 * @FilePath: \vue3-admin\src\layout\components\VMain.vue
-->

<template>
  <el-main class="main-container">
    <el-scrollbar>
      <router-view></router-view>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
  }
})
</script>

<style scoped lang="scss">
.main-container {
  background-color: #666;
  overflow: hidden;

  &.el-main {
    padding: 0;
  }

  ::v-deep(.el-scrollbar__view) {
    padding: 20px;
  }
}
</style>
