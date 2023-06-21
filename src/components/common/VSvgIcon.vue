<!--
 * @Description: 聚合svg组件，可使用本地图标、element-plus icon等
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2023-06-20 16:42:53
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-20 17:38:15
 * @FilePath: \vue3-admin\src\components\common\VSvgIcon.vue
-->
<template>
  <component :is="component.componentId" :name="component.name" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
// import VLocalSvgIcon from './VLocalSvgIcon.vue'
// import VElementIcon from './VElementIcon.vue'

const props = defineProps({
  /**
   * 示例：
   * 本地图标请传name="local-文件名"
   * element icon请传name="i-ep-icon名"
   *
   * 注：可查看docs目录下相关文件说明
   */
  name: {
    type: String,
    required: true,
  },
})

// 定义变量内容

// 组件配置
const components = {
  // 本地图标
  'local-': {
    componentId: 'VLocalSvgIcon',
    name: getLocalIconName(props.name),
  },
  // element-plus icons
  'i-ep-': {
    componentId: 'VElementIcon',
    name: props.name,
  },
  // 扩展其他类型可在此处进行配置
}

// 当前组件
const component = ref({
  componentId: 'VElementIcon', // 初始组件设为VElementIcon,
  name: '', // 初始图标
})

/**
 * 截取local svg name
 * @param icon string routes配置中的meta.icon
 */
function getLocalIconName(icon: string) {
  return icon.split('local-')[1]
}

/**
 * 查找相应组件配置
 * @param name iconName
 */
function findComponent(name: string) {
  // 查找对应的配置进行赋值
  Object.keys(components).forEach(key => {
    if (name.startsWith(key)) {
      component.value = components[key]
    }
  })
}

/**
 * 监听props.name，根据配置渲染相应的组件
 */
watch(
  () => props.name,
  name => {
    findComponent(name)
  },
  {
    immediate: true,
  }
)
</script>

<style scoped></style>
