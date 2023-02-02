<template>
  <el-form
    label-width="80px"
    size="large"
    class="form"
    ref="ruleFormRef"
    :model="userForm"
    :rules="rules"
    status-icon
  >
    <el-form-item label="用户名" prop="username">
      <el-input placeholder="请输入用户名" v-model="userForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input placeholder="请输入密码" v-model="userForm.password" />
    </el-form-item>
    <el-form-item v-if="isSignUp" label="确认密码" prop="rePassword">
      <el-input placeholder="请再次输入密码" v-model="userForm.rePassword" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        class="login-btn"
        @click="signInAction(ruleFormRef)"
      >
        {{ isSignUp ? "注册" : "登录" }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { userRegister, userLogin } from "@/api";
import type { UserRegisterParams } from "@/api/types";
import type { SignType } from "@/views/home-page.vue";
import type { FormInstance, FormRules } from "element-plus";
import { computed, ref, watch } from "vue";

const ruleFormRef = ref<FormInstance>();
const rules = ref<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 4,
      max: 10,
      pattern: /^[a-zA-Z0-9_-]{4,10}$/,
      message: "请输入4-10位的字母或数字",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      min: 6,
      max: 10,
      message: "请输入6-10位的密码",
    },
  ],
  rePassword: [
    {
      trigger: "blur",
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error("请再次输入密码"));
        }
        if (value !== userForm.value.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
    },
  ],
});

const props = withDefaults(
  defineProps<{
    type: SignType;
  }>(),
  {
    type: "0",
  }
);

watch(
  () => props.type,
  () => {
    if (props.type === "1") {
      rules.value.username = [
        { required: true, message: "请输入用户名", trigger: "blur" },
        {
          min: 4,
          max: 10,
          pattern: /^[a-zA-Z0-9_-]{4,10}$/,
          message: "请输入4-10位的字母或数字",
        },
      ];
      rules.value.password = [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
          min: 6,
          max: 10,
          message: "请输入6-10位的密码",
        },
      ];
    } else {
      rules.value.username = [
        { required: true, message: "请输入用户名", trigger: "blur" },
      ];
      rules.value.password = [
        { required: true, message: "请输入密码", trigger: "blur" },
      ];
    }
    ruleFormRef.value?.resetFields();
  },
  { immediate: true }
);

const isSignUp = computed(() => props.type === "1");

const signInAction = (formRef: FormInstance | undefined) => {
  if (!formRef) {
    return;
  }
  formRef.validate((valid) => {
    if (valid) {
      signUserAction();
    }
  });
};

const emits = defineEmits<{
  (event: "success"): void;
}>();

const signUserAction = async () => {
  if (props.type === "1") {
    const data = await userRegister(userForm.value);
    console.log("data: ", data);
    emits("success");
  }
  if (props.type === "0") {
    const data = await userLogin(userForm.value);
    console.log("data: ", data);
    emits("success");
  }
};

const userForm = ref<UserRegisterParams>({
  username: "",
  password: "",
  rePassword: "",
});
</script>

<style scoped>
.form {
  padding-right: 20px;
}

.login-btn {
  width: 100%;
}
</style>
