<template>
  <div>
    <div v-for="item in list" :key="item.id">{{ item.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Typescript的接口，用于标记数据格式
interface ListItem {
  id: string,
  text: string
}

// <ListItem[]>表示list为数组类型，所有的子项需要符合ListItem接口定义的格式
// 好处是模板中使用list和item时，鼠标移入会有类型提示
const list = ref<ListItem[]>([
  {
    id: '1',
    text: 'test1'
  },
  {
    id: '2',
    text: 'test2'
  }
])

</script>

<style lang="scss" scoped>
</style>