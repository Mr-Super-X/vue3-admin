<template>
  <div>登录</div>
  <el-icon @click="handleClick">
    <i-ep-edit />
  </el-icon>
</template>

<script lang="ts" setup name="login">
import { defineComponent } from 'vue'

const handleClick = () => {
  ElMessage.success('123')
}
</script>

<style scoped></style>
