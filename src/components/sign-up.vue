<template>
  <el-form label-width="80px" size="large" class="form">
    <el-form-item label="用户名">
      <el-input placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input placeholder="请输入密码" />
    </el-form-item>
    <el-form-item v-if="isSignUp" label="确认密码">
      <el-input placeholder="请再次输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="login-btn" @click="signInAction">
        {{ isSignUp ? "注册" : "登录" }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = withDefaults(
  defineProps<{
    type: "0" | "1";
  }>(),
  {
    type: "0",
  }
);

const isSignUp = computed(() => props.type === "1");

const router = useRouter();
const signInAction = () => {
  router.replace("/chat");
};
</script>

<style scoped>
.form {
  padding-right: 20px;
}
.login-btn {
  width: 100%;
}
</style>
