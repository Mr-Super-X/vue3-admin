<template>
  <div v-if="!item.hidden" class="menu-item-container">
    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>Navigator One</span>
      </template>
      <v-aside-menu-item v-for="child in item.children" :key="child.id" :item="child" />
    </el-sub-menu>

    <el-menu-item v-else :index="item.path">
      <template #title>
        <span>Navigator One</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script setup lang="ts">
import { Location } from '@element-plus/icons-vue'
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
