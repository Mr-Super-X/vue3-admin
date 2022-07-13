<template>
  <el-tooltip v-model="visible" :hide-after="0">
    <template #content>
      <span>{{ toolTipContent }}</span>
    </template>
    <v-svg-icon
      :icon-class="iconClass"
      @click="handleToggle"
      @mouseenter="visible = true"
      @mouseleave="visible = false"
    />
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const visible = ref(false)
const isFullscreen = ref(false)
const toolTipContent = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))
const iconClass = computed(() => (isFullscreen.value ? 'exit-fullscreen' : 'fullscreen'))

const handleToggle = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning',
    })
    return false
  }
  screenfull.toggle().catch(() => '')
}
const handleChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}

onBeforeUnmount(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', handleChange)
  }
})

onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on('change', handleChange)
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
