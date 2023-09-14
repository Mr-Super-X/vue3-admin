<!--
* @LastDescription: Multi-Language Support
* @LastEditors: lllomh
* @LastContact: admin@lllomh.com
* @LastEditTime: 2023-09-14 14:54:34
-->
<template>
  <div class="layout-navbar-tags">
    <el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll">
      <ul>
        <li v-for="(item, idx) in tagsViewRoutesStore.tagsViewRoutes" :key="item.path + idx">
          {{ t(item.meta.title) }}
        </li>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTagsViewRoutesStore } from '@store/modules/tagsViewRoutes'

// 引入组件
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// 定义变量内容
const tagsViewRoutesStore = useTagsViewRoutesStore()
const scrollbarRef = ref()

// 鼠标滚轮滚动
const onHandleScroll = (e: WheelEventType) => {
  scrollbarRef.value.$refs.wrapRef.scrollLeft += e.wheelDelta / 4
}
</script>
