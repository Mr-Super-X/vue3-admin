<template>
  <i class="el-icon" :style="setIconSvgStyle">
    <component :is="getIconName" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 定义父组件传过来的值
const props = defineProps({
  // svg 图标组件名字
  name: {
    type: String,
  },
  // svg 大小
  size: {
    type: Number,
    default: () => 14,
  },
  // svg 颜色
  color: {
    type: String,
  },
})

// 获取 icon 图标名称
const getIconName = computed(() => {
  return props?.name
})

// 设置图标样式
const setIconSvgStyle = computed(() => {
  return `font-size: ${props.size}px;color: ${props.color};`
})
</script>

<style scoped></style>
