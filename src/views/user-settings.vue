<template>
  <div class="user-container">
    <div class="user-avatar">
      <el-image
        class="img-wrap"
        style="width: 180px; height: 180px"
        src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      />
      <el-upload
        ref="upload"
        class="upload-btn"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="1"
        :auto-upload="false"
        :show-file-list="false"
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
            <el-button @click="handleEdit">修改</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

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

const sexText = computed(() =>
  userForm.value.sex === 1 ? "男" : userForm.value.sex === 2 ? "女" : "保密"
);

const editFlag = ref(false);

const handleEdit = () => {
  editFlag.value = true;
};

const handleSave = () => {
  editFlag.value = false;
};

const userForm = ref({
  username: "dong",
  nickname: "小东",
  sex: 0,
  age: 26,
  phone: 18514567897,
  birthday: "1998/9/26",
  password: "",
});
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
