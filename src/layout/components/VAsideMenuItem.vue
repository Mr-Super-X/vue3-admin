<!-- meta.isHide为true的数据不显示 -->
<!-- 最外层不能嵌套其他标签，否则会导致el-menu collapse属性为true时不能正确隐藏内容 -->
<template v-if="!item.meta.isHide">
  <!-- 有子菜单的 -->
  <el-sub-menu v-if="item?.children?.length" :index="item.path">
    <template #title>
      <v-svg-icon :name="item.meta.icon" />
      <span>{{ item.meta.title }}</span>
    </template>
    <!-- 递归渲染子菜单 -->
    <v-aside-menu-item v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>

  <!-- 无子菜单的 -->
  <el-menu-item v-else :index="item.path" :key="item.path">
    <v-svg-icon :name="item.meta.icon" />
    <template #title>
      <span>{{ item.meta.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import VAsideMenuItem from './VAsideMenuItem.vue'

const props = defineProps({
  item: {
    required: true,
    type: Object,
    default: () => ({}),
  },
})
</script>

<style scoped></style>
