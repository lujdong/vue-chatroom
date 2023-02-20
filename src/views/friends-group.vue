<template>
  <div class="group-panel">
    <div class="side-column">
      <div class="friend-action">
        <el-button type="primary" :icon="Plus" @click="handleAddFriend"
          >添加好友</el-button
        >
      </div>
      <div class="group-row" @click="handleAddGroup">
        <el-icon> <Plus /> </el-icon>新建分组
      </div>
      <el-collapse v-model="activeGroup" @change="onGroupActive" accordion>
        <el-collapse-item
          class="group-item"
          v-for="item in groupList"
          :key="item.id"
          :name="item.id"
          :title="item.groupName"
        >
          <div class="friend-list">
            <div
              v-for="friend in item.friends"
              :key="friend.id"
              :class="['friend-item', { selected: friend.selected }]"
              @click="onSelectFriend(friend)"
            >
              <user-avatar :src="friend.avatar"></user-avatar>
              <span>{{ friend.nickname || friend.username }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="group-content">
      <div v-if="currentSelectFriend?.id" class="friend-panel">
        <div class="friend-box">
          <div class="friend-header">
            <user-avatar
              class="avatar"
              :src="currentSelectFriend.avatar"
            ></user-avatar>
            <div class="info-column">
              <div class="info-line">
                用户名：{{ currentSelectFriend.username }}
              </div>
              <div class="info-line" v-if="currentSelectFriend.nickname">
                昵称：{{ currentSelectFriend.nickname }}
              </div>
            </div>
          </div>
          <el-divider />
          <div class="info-box">
            <div class="info-line">
              <span class="block-text">备注</span>
              <span class="sub-text">点击添加备注</span>
            </div>
            <div class="info-line">
              <span class="block-text">手机号</span>
              <span class="sub-text">18888888888</span>
            </div>
            <div class="info-line">
              <span class="block-text">性别</span>
              <span class="sub-text">保密</span>
            </div>
            <div class="info-line">
              <span class="block-text">生日</span>
              <span class="sub-text">9/26</span>
            </div>
            <div class="info-line">
              <span class="block-text">年龄</span>
              <span class="sub-text">26</span>
            </div>
            <div class="info-line">
              <span class="block-text">分组</span>
              <span class="sub-text">我的好友</span>
            </div>
          </div>
          <el-divider />
          <div class="action-column">
            <div class="action-btn">
              <el-button type="primary">发消息</el-button>
            </div>
            <div class="action-btn">
              <el-button type="danger">解除好友</el-button>
            </div>
          </div>
        </div>
      </div>
      <empty-panel v-else></empty-panel>
    </div>
    <add-friend :show="showAddFriend" @close="closeFriendsModal"></add-friend>
    <add-group :show="showAddGroup" @close="closeGroupModal"></add-group>
  </div>
</template>

<script setup lang="ts">
import emptyPanel from "@/components/empty-panel.vue";
import userAvatar from "@/components/user-avatar.vue";
import addFriend from "@/components/add-friend.vue";
import addGroup from "@/components/add-group.vue";
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import { getFriendsGroupList, getFriendsList, getUserInfoById } from "@/api";
import type { FriendsGroupResponse } from "@/types/friends";
import { useUserStore } from "@/store/user";
import type { ResponseDataType, UserBaseInfo } from "@/types/response";

const userStore = useUserStore();

type FriendInfo = UserBaseInfo & { selected: boolean };
type GroupFriendsList = FriendsGroupResponse & {
  friends: FriendInfo[];
};

const groupList = ref<GroupFriendsList[]>([
  {
    id: "0",
    groupName: "我的好友",
    userId: userStore.user?.id as string,
    createTime: "",
    friends: [],
  },
]);
const activeGroup = ref<string>();

// const friendInfo = ref<UserBaseInfo>();

const currentSelectFriend = ref<UserBaseInfo>();
const onSelectFriend = async (friend: UserBaseInfo) => {
  currentSelectFriend.value = friend;
  groupList.value.forEach((item) => {
    item.friends.forEach((friendItem) => {
      friendItem.selected = friendItem.id === friend.id;
    });
  });
  // const { data } = (await getUserInfoById(
  //   friend.id
  // )) as ResponseDataType<UserBaseInfo>;
  // console.log("data: ", data);
  // friendInfo.value = data;
};

const getFriendsGroupListData = async () => {
  const { data } = (await getFriendsGroupList({
    userId: userStore.user?.id as string,
  })) as ResponseDataType<GroupFriendsList[]>;
  if (data) {
    groupList.value = [...groupList.value, ...data];
  }
};
getFriendsGroupListData();

const onGroupActive = async (activeId: string) => {
  const { data } = (await getFriendsList({
    userId: userStore.user?.id as string,
    groupId: activeId,
  })) as ResponseDataType<FriendInfo[]>;
  groupList.value.forEach((group) => {
    group.friends = data || [];
  });
};

const showAddFriend = ref(false);
const handleAddFriend = () => {
  showAddFriend.value = true;
};
const closeFriendsModal = () => {
  showAddFriend.value = false;
};

const showAddGroup = ref(false);
const handleAddGroup = () => {
  showAddGroup.value = true;
};
const closeGroupModal = () => {
  showAddFriend.value = false;
};
</script>

<style scoped lang="scss">
.group-panel {
  display: flex;
  flex: 1;
  .side-column {
    width: 260px;
    height: 100%;
    border-right: 1px solid #eee;
    .friend-action {
      padding: 8px;
      text-align: right;
    }
    .group-row {
      padding: 8px;
      line-height: 28px;
      display: flex;
      align-items: center;
      border-top: 1px solid #ebeef5;
      cursor: pointer;
    }
    .group-item {
      ::v-deep(.el-collapse-item__header) {
        padding: 0 8px;
      }
      ::v-deep(.el-collapse-item__content) {
        padding-bottom: 0;
      }
      .friend-list {
        box-sizing: border-box;
        .friend-item {
          padding: 8px;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s linear;
          &:hover {
            background-color: #eee;
          }
          &.selected {
            background-color: #eee;
          }
          span {
            margin-left: 8px;
            font-size: 16px;
          }
        }
      }
    }
  }
  .group-content {
    flex: 1;
    height: 100%;
    .friend-panel {
      padding: 100px 200px;
    }
    .info-line {
      line-height: 1.5;
    }
    .friend-header {
      display: flex;
      .info-column {
        margin-left: 8px;
      }
    }
    .info-box {
      .info-line {
        line-height: 2;
        .block-text {
          display: inline-block;
          width: 50px;
          text-align: right;
        }
        .sub-text {
          color: #999;
          margin-left: 8px;
        }
      }
    }
    .action-column {
      .action-btn {
        margin-bottom: 8px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
