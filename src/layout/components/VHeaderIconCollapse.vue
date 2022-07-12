<template>
  <el-tooltip class="icon-collapse-container" :content="toolTipContent" placement="bottom">
    <el-button>icon</el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const toolTipContent = ref('收起')

    return {
      toolTipContent,
    }
  },
})
</script>

<style scoped lang="scss">
.icon-collapse-container {
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
</style>
