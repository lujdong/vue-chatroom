<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">web 聊天室</h2>
      <el-tabs
        type="border-card"
        class="tabs-container"
        v-model="currentTab"
        @tab-click="onTableChange"
      >
        <el-tab-pane label="登录">
          <signup :type="currentTab" @success="loginSuccess" />
        </el-tab-pane>
        <el-tab-pane label="注册">
          <signup :type="currentTab" @success="registerSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import signup from "@/components/sign-up.vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useRouter } from "vue-router";
import type { UserBaseInfo } from "@/types/response";
import { useUserStore } from "@/store/user";
/**
 * 1：注册
 * 0：登录
 */
export type SignType = "0" | "1";

const currentTab = ref<SignType>("0");

const onTableChange = () => {
  currentTab.value = currentTab.value === "0" ? "1" : "0";
};

const registerSuccess = () => {
  ElMessage.success("注册成功");
  currentTab.value = "0";
};

const router = useRouter();

const userStore = useUserStore();
const loginSuccess = (data?: UserBaseInfo) => {
  if (data) {
    userStore.user = data;
  }
  router.replace({
    path: "/chat",
    query: {
      id: data?.id,
    },
  });
};
</script>

<style lang="scss" scoped>
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
</style>
