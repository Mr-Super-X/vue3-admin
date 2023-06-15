<!--
 * @Description: Layout主要区域布局组件，存放业务视图
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-20 13:17:47
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-15 10:31:06
 * @FilePath: \vue3-admin\src\layout\components\VMain.vue
-->

<template>
  <el-main class="layout-main">
    <el-scrollbar class="layout-main-scroll" wrap-class="layout-main-scroll" view-class="layout-main-scroll">
      <VRouterView />
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { NextLoading } from '@utils/loading'

// 引入组件
import VRouterView from './VRouterView.vue'

// 组件加载后关闭loading状态，否则会一直转圈
onMounted(() => {
  // 500ms后关闭，让界面有个简单的加载动画
  NextLoading.done(500)
})
</script>
