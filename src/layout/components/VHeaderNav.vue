<!--
 * @Description: 头部导航栏Nav组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 12:56:55
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-05-31 13:18:29
 * @FilePath: \vue3-admin\src\layout\components\VHeaderNav.vue
-->
<template>
  <div class="nav-container">Nav</div>
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
.nav-container {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}
</style>
