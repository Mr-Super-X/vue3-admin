<!--
 * @Description: 头部用户信息组件
 * @Tips: 亲，记得补全功能描述哦~  (ღ˘⌣˘ღ)
 * @Author: Mr.Mikey
 * @Contact: 1303232158@qq.com
 * @Date: 2022-08-04 10:48:28
 * @LastEditors: Mr.Mikey
 * @LastEditTime: 2022-08-04 16:43:45
 * @FilePath: \vue3-admin\src\layout\components\VHeaderUser.vue
-->

<template>
  <el-dropdown trigger="click" class="avatar-container" size="large">
    <div class="avatar-wrapper">
      <img src="@/assets/images/avatar.gif" class="user-avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link to="/">
          <el-dropdown-item>Dashboard</el-dropdown-item>
        </router-link>
        <a target="_blank" href="https://github.com/Mr-Super-X/vue3-admin">
          <el-dropdown-item>Github</el-dropdown-item>
        </a>
        <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import useCurrentInstance from '@/utils/hooks/useCurrentInstance'
const { proxy } = useCurrentInstance()

const handleLogout = () => {
  proxy.$message.warning('来了还想跑！没门！')
}
</script>

<style lang="scss" scoped>
.avatar-container {
  margin-left: 15px;
  .avatar-wrapper {
    cursor: pointer;
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
