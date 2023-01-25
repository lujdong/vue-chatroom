<template>
  <div class="container">
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="title">web 聊天室</h2>
        <el-tabs type="border-card" class="tabs-container">
          <el-tab-pane label="登录">
            <signup type="0" />
          </el-tab-pane>
          <el-tab-pane label="注册">
            <signup type="1" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import signup from "@/components/sign-up.vue";
</script>

<style lang="scss" scoped>
.container {
  background-image: url(../assets/bg.png);
  display: flex;
  align-items: center;
  justify-content: center;
  .login-container {
    width: 460px;
    .login-card {
      height: 100%;
      padding: 12px;
      .title {
        text-align: center;
        margin-bottom: 28px;
      }
      .tabs-container {
        ::v-deep(.el-tabs__nav) {
          width: 100%;
          display: flex;
          .el-tabs__item {
            flex: 1;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
