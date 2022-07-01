<template>
  <div class="home">
    <div v-for="item in list" :key="item.id">{{ item.text }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Typescript的接口，用于标记数据格式
// 1. 属性或参数中使用?：表示该属性或参数为可选项
// 2. 属性或参数中使用!：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
// 3. 变量后使用!：表示类型推断排除null、undefined
interface IListItem {
  id: string
  text?: string
}

// <IListItem[]>表示list为数组类型，所有的子项需要符合IListItem接口定义的格式
// 好处是模板中使用list和item时，鼠标移入会有类型提示
const list = ref<IListItem[]>([
  {
    id: '1',
    text: 'test1',
  },
  {
    id: '2',
    text: 'test2',
  },
])
</script>

<style lang="scss" scoped>
.home {
  height: 1000px;
}
</style>
