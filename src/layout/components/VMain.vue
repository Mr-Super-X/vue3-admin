<!--
 * @Description: Layout主要区域布局组件，存放业务视图
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-05-20 13:17:47
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2023-06-19 17:47:44
 * @FilePath: \vue3-admin\src\layout\components\VMain.vue
-->

<template>
  <el-main class="layout-main">
    <el-scrollbar
      id="layout-main-scroll"
      class="layout-main-scroll"
      wrap-class="layout-main-scroll-wrap"
      view-class="layout-main-scroll-inner"
    >
      <VRouterView id="layout-router-view" />
    </el-scrollbar>
  </el-main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { NextLoading } from '@utils/loading'
import { onBeforeRouteUpdate } from 'vue-router'

// 引入组件
import VRouterView from './VRouterView.vue'

// 路由更新时触发视图容器滚动条位置回到顶部
// 滚动条不是body元素上的，因此在createRouter中设置scrollBehavior将不生效
onBeforeRouteUpdate((to, from) => {
  // 由于路由设置了0.3s过渡效果，所以此处设置了0.3s定时器。避免页面切换效果突兀。
  setTimeout(() => {
    document.getElementById('layout-router-view').scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, 300)
})

// 组件加载后关闭loading状态，否则会一直转圈
onMounted(() => {
  // 500ms后关闭，让界面有个简单的加载动画
  NextLoading.done(500)
})
</script>
