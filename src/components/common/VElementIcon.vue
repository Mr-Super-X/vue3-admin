<!--
 * @Description: element-plus icon组件，调用该组件传入i-ep-[icon名称]即可使用，如i-ep-Location
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2023-06-20 11:00:16
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-20 14:26:46
 * @FilePath: \vue3-admin\src\components\common\VElementIcon.vue
-->
<template>
  <i class="el-icon" :style="setIconSvgStyle">
    <component v-if="getIconName" :is="getIconName" />
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
