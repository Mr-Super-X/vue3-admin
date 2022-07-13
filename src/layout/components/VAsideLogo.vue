<!--
 * @Description: Logo区域组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 11:59:06
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-05-31 13:21:55
 * @FilePath: \vue3-admin\src\layout\components\VAsideLogo.vue
-->

<template>
  <div class="logo-container">Logo</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
}
</style>
