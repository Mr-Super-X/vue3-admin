<!-- meta.isHide为true的数据不显示 -->
<!-- 这里不能嵌套其他标签，否则会导致el-menu collapse属性为true时不能正确隐藏内容 -->
<template v-if="!item.meta.isHide">
  <el-sub-menu v-if="item?.children?.length" :index="item.path">
    <template #title>
      <!-- 
          出现runtime-core.esm-bundler.js [Vue warn]: Invalid vnode type when creating vnode: . 
          时，表示当前item.meta.icon没有设置值，因此需要v-if屏蔽掉该错误
        -->
      <v-element-icon v-if="item.meta.icon" :name="item.meta.icon" />
      <span>{{ item.meta.title }}</span>
    </template>
    <v-aside-menu-item v-for="child in item.children" :key="child.path" :item="child" />
  </el-sub-menu>

  <el-menu-item v-else :index="item.path" :key="item.path">
    <!-- 
          出现runtime-core.esm-bundler.js [Vue warn]: Invalid vnode type when creating vnode: . 
          时，表示当前item.meta.icon没有设置值，因此需要v-if屏蔽掉该错误
        -->
    <v-element-icon v-if="item.meta.icon" :name="item.meta.icon" />
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
