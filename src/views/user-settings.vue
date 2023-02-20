<template>
  <div class="user-container">
    <div class="user-avatar">
      <el-image
        class="img-wrap"
        style="width: 180px; height: 180px"
        :src="userForm.avatar"
      />
      <el-upload
        ref="upload"
        class="upload-btn"
        :limit="1"
        :show-file-list="false"
        :http-request="uploadAction"
      >
        <template #trigger>
          <el-button type="primary">选择头像</el-button>
        </template>
      </el-upload>
    </div>
    <div class="info-column">
      <el-form label-width="80px">
        <el-form-item label="用户名：">
          <div class="info-row">
            <el-input v-if="editFlag" v-model="userForm.username"></el-input>
            <span v-else class="info-text">{{ userForm.username }}</span>
            <!-- <el-icon class="edit-icon">
              <EditPen />
            </el-icon> -->
          </div>
        </el-form-item>
        <el-form-item label="昵称：">
          <div class="info-row">
            <el-input v-if="editFlag" v-model="userForm.nickname"></el-input>
            <span v-else class="info-text">{{ userForm.nickname }}</span>
            <!-- <el-icon class="edit-icon">
              <EditPen />
            </el-icon> -->
          </div>
        </el-form-item>
        <el-form-item label="手机号：">
          <div class="info-row">
            <el-input v-if="editFlag" v-model="userForm.phone"></el-input>
            <span v-else class="info-text">{{ userForm.phone }}</span>
            <!-- <el-icon class="edit-icon">
              <EditPen />
            </el-icon> -->
          </div>
        </el-form-item>
        <el-form-item label="性别：">
          <div class="info-row">
            <el-select v-if="editFlag" v-model="userForm.sex">
              <el-option
                v-for="item in SexList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <span v-else class="info-text">{{ sexText }}</span>
          </div>
        </el-form-item>
        <el-form-item label="年龄：">
          <div class="info-row">
            <el-input v-if="editFlag" v-model="userForm.age"></el-input>
            <span v-else class="info-text">{{ userForm.age }}</span>
          </div>
        </el-form-item>
        <el-form-item label="生日：">
          <div class="info-row">
            <el-date-picker
              v-if="editFlag"
              type="date"
              format="YYYY/MM/DD"
              v-model="userForm.birthday"
            />
            <span v-else class="info-text">9/26</span>
          </div>
        </el-form-item>
        <el-form-item label="密码：">
          <div class="info-row">
            <el-input
              v-if="editFlag"
              v-model="userForm.password"
              type="password"
              placeholder="请输入新密码"
            ></el-input>
            <span v-else class="info-text">******</span>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="action-btn">
            <el-button @click="handleEdit">{{
              editFlag ? "取消" : "修改"
            }}</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { updateUserAvatar, getUserInfoById, updateUserInfo } from "@/api";
import { useUserStore } from "@/store/user";
import type { ResponseDataType, UserBaseInfo } from "@/types/response";
import { SexType } from "@/enums";
import type { UploadRequestOptions } from "element-plus";

const SexList = [
  {
    label: "保密",
    value: 0,
  },
  {
    label: "男",
    value: 1,
  },
  {
    label: "女",
    value: 2,
  },
];

const userStore = useUserStore();

const getUserInfo = async () => {
  const { data } = (await getUserInfoById(
    userStore.user?.id as string
  )) as ResponseDataType<UserBaseInfo>;
  if (data) {
    userForm.value = data;
  }
};
getUserInfo();

const sexText = computed(() =>
  userForm.value?.sex === SexType.BOY
    ? "男"
    : userForm.value?.sex === SexType.GIRL
    ? "女"
    : "保密"
);

const editFlag = ref(false);

const handleEdit = () => {
  editFlag.value = !editFlag.value;
};

const handleSave = async () => {
  // TODO: 用户不存在跳转登录
  if (userForm.value) {
    const data = await updateUserInfo(userForm.value);
    console.log("data: ", data);
  }

  editFlag.value = false;
};

const userForm = ref(
  userStore.user
    ? userStore.user
    : {
        username: "",
        nickname: "",
        phone: "",
        sex: SexType.SECRECY,
        age: 0,
        avatar: "",
        birthday: "",
        password: "",
      }
);

const uploadAction = async (options: UploadRequestOptions) => {
  const formData = new FormData();
  formData.append("userId", userStore.user?.id as string);
  formData.append("avatar", options.file);
  await updateUserAvatar(formData);
  getUserInfo();
};
</script>

<style scoped lang="scss">
.user-container {
  padding: 80px;
  display: flex;
  .user-avatar {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .upload-btn {
      margin-top: 12px;
    }
    .img-wrap {
      border: 1px solid #efefef;
    }
  }
  .info-column {
    flex: 1;
    margin-left: 68px;
    ::v-deep(.el-form-item__label) {
      font-size: 16px;
      color: #333;
    }
    .edit-icon {
      opacity: 0;
      margin-left: 8px;
      font-size: 18px;
      cursor: pointer;
      transform: 1s all linear;
    }
    .info-row {
      display: flex;
      align-items: center;
      width: 280px;
      ::v-deep(.el-input, .el-select, .el-date) {
        width: 220px;
      }
      &:hover {
        .edit-icon {
          opacity: 1;
        }
      }
    }
  }
}
</style>
