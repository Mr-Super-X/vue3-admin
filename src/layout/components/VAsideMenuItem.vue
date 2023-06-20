<template>
  <!-- meta.isHide为true的数据不显示 -->
  <!-- 破案了，这里不能用其他标签代替，否则会导致el-menu collapse属性为true时不能正确隐藏内容 -->
  <template v-if="!item.meta.isHide">
    <el-sub-menu v-if="item?.children?.length" :index="item.path">
      <template #title>
        <!-- 
          出现runtime-core.esm-bundler.js [Vue warn]: Invalid vnode type when creating vnode: . 
          时，表示当前item.meta.icon没有设置值
        -->
        <v-element-icon :name="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
      <v-aside-menu-item v-for="child in item.children" :key="child.id" :item="child" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.path">
      <template #title>
        <!-- 
          出现runtime-core.esm-bundler.js [Vue warn]: Invalid vnode type when creating vnode: . 
          时，表示当前item.meta.icon没有设置值
        -->
        <v-element-icon :name="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </template>
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
