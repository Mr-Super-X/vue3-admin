<!--
 * @Description: svg组件，在src/assets/icons/svg文件夹下添加svg后调用该组件即可使用
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-07-14 00:31:13
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-08-03 16:22:36
 * @FilePath: \vue3-admin\src\components\common\VSvgIcon.vue
-->
<template>
  <div class="v-svg-icon">
    <!-- https?:|mailto:|tel:渲染div -->
    <div v-if="isExternals" :style="styleExternalIcon" class="svg-external-icon svg-icon" />
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
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
})

// 根据用户传入的iconClass判断文件扩展
const isExternals = computed(() => isExternal(props.iconClass))
const iconName = computed(() => `#icon-${props.iconClass}`)
const svgClass = computed(() => {
  if (props.className) {
    return 'svg-icon ' + props.className
  } else {
    return 'svg-icon'
  }
})
const styleExternalIcon = computed(() => ({
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`,
}))
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
