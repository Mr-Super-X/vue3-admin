<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { getOrderList } from "./request/modules/order";

export default defineComponent({
  name: "App",
  setup() {
    // 测试重复请求过滤功能
    /* getOrderList().then(({data}: any) => {
      console.log(data)
    })
    getOrderList().then(({data}: any) => {
      console.log(data)
    }) */
  },
});
</script>

<style>
</style>
