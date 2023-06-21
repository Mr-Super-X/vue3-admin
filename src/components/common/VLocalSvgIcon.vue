<!--
 * @Description: svg组件，在src/assets/icons/svg文件夹下添加.svg文件后调用该组件即可使用
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-07-14 00:31:13
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-20 16:41:14
 * @FilePath: \vue3-admin\src\components\common\VLocalSvgIcon.vue
-->
<template>
  <div class="v-local-svg-icon">
    <!-- svg格式渲染svg标签 -->
    <svg :style="setIconSvgStyle" aria-hidden="true" class="local-svg-icon">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  // 对应assets/icons/svg目录下的文件名
  name: {
    type: String,
    required: true,
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

// 生成iconName
const iconName = computed(() => `#icon-${props.name}`)

// 设置图标样式
const setIconSvgStyle = computed(() => {
  return `font-size: ${props.size}px;color: ${props.color};`
})
</script>

<style lang="scss" scoped>
.local-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}

.local-svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
