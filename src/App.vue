<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { getOrderList } from "./request/modules/demo";
// import request from "./request";

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
    // axios.get('/auth/oauth/token').then(res => {
    //   console.log(res)
    // })

    // 测试mock功能
    // request({
    //   url: '/auth/oauth/token'
    // }).then(({data}: any) => {
    //   return data.data;
    // }).then(d => {
    //   console.log(d)
    // })
  },
});
</script>

<style>
</style>
