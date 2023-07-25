<!--
 * @Description: Logo区域组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-31 11:59:06
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-28 09:21:48
 * @FilePath: \vue3-admin\src\layout\components\VAsideLogo.vue
-->

<template>
  <div class="layout-logo">
    <img src="../../assets/images/logo.svg" alt="vue3-admin-logo" @click="handleGoHome" />
    <!-- <h1 class="title">{{ themeConfig.globalTitle }}</h1> -->
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useThemeConfigStore } from '@store/modules/themeConfig'

const router = useRouter()
const themeConfigStore = useThemeConfigStore()
const { themeConfig } = storeToRefs(themeConfigStore)

const handleGoHome = () => {
  router.push('/')
}
</script>
