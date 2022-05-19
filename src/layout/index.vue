<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <el-container class="layout">
      <v-aside />
      <el-container class="layout-container">
        <v-header />
        <v-main />
        <v-footer />
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
// import en from "element-plus/lib/locale/lang/en";
import VAside from "./components/VAside.vue";
import VHeader from "./components/VHeader.vue";
import VMain from "./components/VMain.vue";
import VFooter from "./components/VFooter.vue";

export default defineComponent({
  components: {
    ElConfigProvider,
    VAside,
    VHeader,
    VMain,
    VFooter,
  },
  setup() {
    return {
      locale: zhCn,
      zIndex: 3000,
      size: "small",
    };
  },
});
</script>

<style scoped lang="scss">
.layout {
  height: 100%;
  &-container {
    flex-direction: column;
  }
}
</style>