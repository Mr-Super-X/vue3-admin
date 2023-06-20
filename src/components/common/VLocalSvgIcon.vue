<!--
 * @Description: svg组件，在src/assets/icons/svg文件夹下添加.svg文件后调用该组件即可使用
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-07-14 00:31:13
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-19 18:09:50
 * @FilePath: \vue3-admin\src\components\common\VLocalSvgIcon.vue
-->
<template>
  <div class="v-local-svg-icon">
    <!-- https?:|mailto:|tel:渲染div -->
    <div v-if="isExternals" :style="styleExternalIcon" class="local-svg-external-icon local-svg-icon" />
    <!-- svg格式渲染svg标签 -->
    <svg v-else :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternal } from '@/utils/validate'
const props = defineProps({
  // 对应assets/icons/svg目录下的文件名
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

// 根据用户传入的iconClass判断文件扩展
const isExternals = computed(() => isExternal(props.name))
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
  if (props.className) {
    return 'local-svg-icon ' + props.className
  } else {
    return 'local-svg-icon'
  }
})
const styleExternalIcon = computed(() => ({
  mask: `url(${props.name}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.name}) no-repeat 50% 50%`,
}))
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
