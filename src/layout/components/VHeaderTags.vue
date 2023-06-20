<template>
  <div class="layout-navbar-tags">
    <el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll"></el-scrollbar>
    <!-- <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        {{ item.content }}
      </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// 定义变量内容
const scrollbarRef = ref()
const tagList = ref([])

// 鼠标滚轮滚动
const onHandleScroll = (e: WheelEventType) => {
  scrollbarRef.value.$refs.wrapRef.scrollLeft += e.wheelDelta / 4
}
</script>
