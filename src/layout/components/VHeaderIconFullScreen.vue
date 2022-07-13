<template>
  <el-tooltip v-model="visible" :hide-after="0">
    <template #content>
      <span>{{ toolTipContent }}</span>
    </template>
    <v-svg-icon :icon-class="iconClass" @click="handleFullScreen" />
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'

const emit = defineEmits(['toggleClick'])

const visible = ref(false)
const isFullscreen = ref(false)
const toolTipContent = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))
const iconClass = computed(() => (isFullscreen.value ? 'exit-fullscreen' : 'fullscreen'))

function handleFullScreen() {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: 'you browser can not work',
      type: 'warning',
    })
    return false
  }
  screenfull.toggle()
  isFullscreen.value = !isFullscreen.value
  emit('toggleClick', screenfull.isFullscreen)
}
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
