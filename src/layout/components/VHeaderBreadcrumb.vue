<template>
  <el-breadcrumb class="breadcrumb-container" :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: '/' }">home</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">page</a></el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

export default defineComponent({
  setup() {
    return { ArrowRight }
  },
})
</script>

<style scoped lang="scss"></style>
