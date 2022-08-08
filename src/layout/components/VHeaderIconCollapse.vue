<template>
  <el-tooltip v-model="visible" :hide-after="0">
    <template #content>
      <span>{{ toolTipContent }}</span>
    </template>
    <svg
      :class="{ 'is-active': isCollapse }"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      @mouseenter="visible = true"
      @mouseleave="visible = false"
      @click="toggleClick"
    >
      <path
        d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
      />
    </svg>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@store/modules/app'

const visible = ref(false)

const appStore = useAppStore()

const isCollapse = computed(() => appStore.getIsCollapse)

const toolTipContent = computed(() => (isCollapse.value ? '收起' : '展开'))

function toggleClick() {
  const bool = !isCollapse.value
  appStore.toggleAsideMenu(bool)
}
</script>

<style scoped lang="scss">
.hamburger {
  vertical-align: middle;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  cursor: pointer;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
