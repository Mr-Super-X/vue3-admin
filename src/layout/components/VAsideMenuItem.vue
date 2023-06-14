<template>
  <!-- meta.isHide为true的数据不显示 -->
  <div v-if="!item.meta.isHide" class="menu-item-container">
    <el-sub-menu v-if="item?.children?.length" :index="item.path">
      <template #title>
        <el-icon>
          <i-ep-location />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <v-aside-menu-item v-for="child in item.children" :key="child.id" :item="child" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.path">
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
  </div>
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
