<template>
  <el-dialog
    v-model="dialogVisible"
    title="添加好友"
    width="420px"
    top="380px"
    :close-on-click-modal="false"
    @close="onClose"
  >
    <el-form size="large">
      <el-form-item>
        <el-input
          v-model="username"
          autocomplete="off"
          placeholder="输入好友用户名进行查找"
          @change="onUsernameChange"
          clearable
        />
      </el-form-item>
    </el-form>
    <el-scrollbar max-height="320px">
      <div class="friends-list">
        <template v-if="dataFlag">
          <div
            class="friends-list-item"
            v-for="item in userlist"
            :key="item.id"
          >
            <div class="friends-list-item-info">
              <user-avatar :src="item.avatar"></user-avatar>
              <div class="info-box">
                <span class="nickname">{{
                  item.nickname || item.username
                }}</span>
                <span class="username">{{ item.username }}</span>
              </div>
            </div>
            <el-button
              circle
              :icon="Plus"
              type="primary"
              @click="addFriendAction(item)"
            ></el-button>
          </div>
        </template>
        <span v-else class="empty-text">未查询到数据</span>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import userAvatar from "./user-avatar.vue";
import { Plus } from "@element-plus/icons-vue";
import { getUserListByUsername, addFriend } from "@/api";
import type { ResponseDataType, UserBaseInfo } from "@/types/response";
import { useUserStore } from "@/store/user";
import { ElMessage } from "element-plus";

const userStore = useUserStore();

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (event: "close"): void;
}>();

const dialogVisible = ref(false);

watch(
  () => props.show,
  () => {
    dialogVisible.value = props.show;
  },
  {
    immediate: true,
  }
);

const username = ref("");
const userlist = ref<UserBaseInfo[]>([]);
const dataFlag = ref(true);
const onUsernameChange = async () => {
  const { data } = (await getUserListByUsername({
    username: username.value,
  })) as ResponseDataType<UserBaseInfo[]>;
  if (data) {
    userlist.value = data;
  }
  dataFlag.value = !!userlist.value.length;
};

const addFriendAction = async (friend: UserBaseInfo) => {
  const { message } = (await addFriend({
    userId: userStore.user?.id as string,
    friendId: friend.id,
  })) as ResponseDataType<UserBaseInfo[]>;
  ElMessage.success(message);
};

const onClose = () => {
  dialogVisible.value = false;
  emit("close");
  username.value = "";
  userlist.value = [];
};
</script>

<style scoped lang="scss">
.friends-list {
  padding: 0 6px;
  text-align: center;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    transition: background-color 0.3s all;
    &:hover {
      background-color: #ecf5ff;
    }

    &-info {
      display: flex;
      align-items: center;
      .info-box {
        margin-left: 12px;
        display: flex;
        flex-direction: column;
        .nickname {
          font-size: 16px;
        }
        .username {
          font-size: 14px;
          color: #aaa;
        }
        .nickname,
        .username {
          line-height: 1.5;
        }
      }
    }
  }
}
</style>
