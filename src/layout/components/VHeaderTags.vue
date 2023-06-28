<template>
  <div class="layout-navbar-tags">
    <el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll"></el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 引入组件

// 定义变量内容
const scrollbarRef = ref()

// 鼠标滚轮滚动
const onHandleScroll = (e: WheelEventType) => {
  scrollbarRef.value.$refs.wrapRef.scrollLeft += e.wheelDelta / 4
}
</script>
