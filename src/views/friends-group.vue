<template>
  <div class="group-panel">
    <div class="side-column">
      <div class="friend-action">
        <el-button type="primary" :icon="Plus">添加好友</el-button>
      </div>
      <div class="group-row">
        <el-icon> <Plus /> </el-icon>新建分组
      </div>
      <el-collapse>
        <el-collapse-item
          class="group-item"
          v-for="item in groupList"
          :key="item.id"
          :title="item.title"
        >
          <div class="friend-list">
            <div
              v-for="friend in item.friends"
              :key="friend.id"
              :class="['friend-item', { selected: friend.selected }]"
              @click="onSelectFriend(friend)"
            >
              <user-avatar :src="friend.avatar"></user-avatar>
              <span>{{ friend.nickname }}</span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="group-content">
      <div v-if="currentSelectFriend?.id" class="friend-panel">
        <div class="friend-box">
          <div class="friend-header">
            <user-avatar class="avatar"></user-avatar>
            <div class="info-column">
              <div class="info-line">用户名：{{ "zs123" }}</div>
              <div class="info-line">
                昵称：{{ currentSelectFriend.nickname }}
              </div>
            </div>
          </div>
          <el-divider />
          <div class="info-box">
            <div class="info-line">
              <span>备注</span>
              <span class="sub-text">点击添加备注</span>
            </div>
            <div class="info-line">
              <span>性别</span>
              <span class="sub-text">保密</span>
            </div>
            <div class="info-line">
              <span>生日</span>
              <span class="sub-text">9/26</span>
            </div>
            <div class="info-line">
              <span>年龄</span>
              <span class="sub-text">26</span>
            </div>
            <div class="info-line">
              <span>分组</span>
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
  </div>
</template>

<script setup lang="ts">
import emptyPanel from "@/components/empty-panel.vue";
import userAvatar from "@/components/user-avatar.vue";
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";

const groupList = ref([
  {
    id: 1,
    title: "我的好友",
    friends: [
      {
        id: 1,
        nickname: "张三",
        selected: false,
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxA",
      },
      {
        id: 2,
        nickname: "李四",
        selected: false,
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxA",
      },
    ],
  },
]);

const currentSelectFriend = ref<any>(null);
const onSelectFriend = (friend: any) => {
  currentSelectFriend.value = friend;
  groupList.value.forEach((item) => {
    item.friends.forEach((friendItem) => {
      friendItem.selected = friendItem.id === friend.id;
    });
  });
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
