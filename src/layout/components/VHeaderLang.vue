<!--
 * @Description: language component
 * @Author: lllomh
 * @Contact: admin@lllomh.com
 * @Date: 2023-09-14 13:43:04
 * @FilePath: \vue3-admin\src\layout\components\VHeaderLang.vue
-->
<template>
  <!-- Language selection buttons -->
  <div class="language">
    <el-select
      v-model="value"
      @change="changeLang(value)"
      class="m-2"
      placeholder="Lang"
      size="small"
      style="width: 100px; outline: none"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

// Function to change the language
const changeLang = val => {
  locale.value = val
  // Save the selected language in local storage
  localStorage.setItem('lang', val)
}

import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'zhCN',
    label: '中文',
  },
  {
    value: 'enUs',
    label: 'English',
  },
]
</script>
