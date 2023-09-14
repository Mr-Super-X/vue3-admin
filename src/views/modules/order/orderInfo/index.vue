<!--
* @LastDescription: Multi-Language Support
* @LastEditors: lllomh
* @LastContact: admin@lllomh.com
* @LastEditTime: 2023-09-14 18:02:23
-->
<template>
  <div>{{ $t('messages.orderInfo') }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  },
})
</script>

<style scoped>
div {
  height: 3000px;
}
</style>
