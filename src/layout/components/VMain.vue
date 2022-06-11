<!--
 * @Description: Layout主要区域布局组件，存放业务视图
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-20 13:17:47
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-05-31 19:14:50
 * @FilePath: \vue3-admin\src\layout\components\VMain.vue
-->

<template>
  <el-main class="main-container">
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="keepAliveIncludes">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@store/index'

export default defineComponent({
  setup () {
    const store = useStore()
    return {
      // 为了访问 state ，需要创建 computed 引用以保留响应性，这与在选项式 API 中创建计算属性等效。
      keepAliveIncludes: computed(() => store.state.system.keepAliveIncludes)
      // setKeepAliveIncludes:
    }
  }
})
</script>

<style scoped lang="scss">
.main-container {
  background-color: #f8f8f8;
  overflow: hidden;

  &.el-main {
    padding: 0;
  }

  ::v-deep(.el-scrollbar__view) {
    padding: 20px;
  }
}
</style>
