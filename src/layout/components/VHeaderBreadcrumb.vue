<!--
* @LastDescription: Multi-Language Support
* @LastEditors: lllomh
* @LastContact: admin@lllomh.com
* @LastEditTime: 2023-09-14 16:56:12
-->
<template>
  <el-breadcrumb class="layout-navbars-breadcrumb" :separator-icon="ArrowRight">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(v, k) in state.breadcrumbList"
        :key="!v.meta.tagsViewName ? v.meta.title : v.meta.tagsViewName"
      >
        <span v-if="k === state.breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
          <div v-if="!v.meta.tagsViewName">{{ $t(v.meta.title) }}</div>
          <div v-else>{{ v.meta.tagsViewName }}</div>
        </span>
        <a v-else @click.prevent="onBreadcrumbClick(v)">
          {{ $t(v.meta.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
import { useRouteStore } from '@store/modules/route'
import { useThemeConfigStore } from '@store/modules/themeConfig'
import { storeToRefs } from 'pinia'

// 定义变量内容
const routeStore = useRouteStore()
const themeConfigStore = useThemeConfigStore() // 布局配置store
const { themeConfig } = storeToRefs(themeConfigStore)
const route = useRoute()
const router = useRouter()
const state = ref<BreadcrumbState>({
  breadcrumbList: [],
  routeSplit: [],
  routeSplitFirst: '',
  routeSplitIndex: 1,
})

// 处理面包屑数据
const getBreadcrumbList = arr => {
  arr.forEach(item => {
    state.value.routeSplit.forEach((v: string, k: number, arrs: string[]) => {
      if (state.value.routeSplitFirst === item.path) {
        state.value.routeSplitFirst += `/${arrs[state.value.routeSplitIndex]}`
        state.value.breadcrumbList.push(item)
        state.value.routeSplitIndex++
        if (item.children) getBreadcrumbList(item.children)
      }
    })
  })
}

// 当前路由字符串切割成数组，并删除第一项空内容
const initRouteSplit = (path: string) => {
  if (!themeConfig.value.isBreadcrumb) return false
  state.value.breadcrumbList = [routeStore.routesTree[0]]
  state.value.routeSplit = path.split('/')
  state.value.routeSplit.shift()
  state.value.routeSplitFirst = `/${state.value.routeSplit[0]}`
  state.value.routeSplitIndex = 1
  getBreadcrumbList(routeStore.routesTree)
}

// 面包屑点击时
const onBreadcrumbClick = v => {
  const { redirect, path } = v
  if (redirect) router.push(redirect)
  else router.push(path)
}

// 页面加载时
onMounted(() => {
  initRouteSplit(route.path)
})
// 路由更新时
onBeforeRouteUpdate(to => {
  initRouteSplit(to.path)
})
</script>

<style scoped lang="scss"></style>
