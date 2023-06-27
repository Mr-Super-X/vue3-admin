<!--
 * @Description: Logo区域组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 11:59:06
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-27 18:04:08
 * @FilePath: \vue3-admin\src\layout\components\VAsideLogo.vue
-->

<template>
  <div class="layout-logo">
    <img src="../../assets/images/logo.png" alt="vue3-admin-logo" @click="handleGoHome" />
    <h1 class="title">vue3-admin</h1>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>
