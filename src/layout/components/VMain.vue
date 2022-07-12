<!--
 * @Description: Layout主要区域布局组件，存放业务视图
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-20 13:17:47
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-06-11 18:15:00
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
import { useSystemStore } from '@store/modules/system'

export default defineComponent({
  setup() {
    const systemStore = useSystemStore()
    // ❌ 这不起作用，因为它会破坏响应式
    // 这和从 props 解构是一样的
    // const { keepAliveIncludes } = systemStore
    return {
      // 为了访问 state ，需要创建 computed 引用以保留响应性，这与在选项式 API 中创建计算属性等效。
      keepAliveIncludes: computed(() => systemStore.keepAliveIncludes),
    }
  },
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
