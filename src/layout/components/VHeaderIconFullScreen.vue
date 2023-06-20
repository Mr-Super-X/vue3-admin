<template>
  <el-tooltip v-model="visible" :hide-after="0">
    <template #content>
      <span>{{ toolTipContent }}</span>
    </template>
    <v-local-svg-icon
      class="icon-fullscreen-box"
      :name="iconName"
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
const iconName = computed(() => (isFullscreen.value ? 'exit-fullscreen' : 'fullscreen'))

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
.icon-fullscreen-box {
  cursor: pointer;
}
</style>
