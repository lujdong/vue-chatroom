<template>
  <el-scrollbar height="350" ref="scrollBox">
    <div class="record-list">
      <div
        :class="['record-item', { 'right-user': item.fromId === user?.id }]"
        v-for="item in socketStore.messageList"
        :key="item.id"
      >
        <div class="record-info">
          <div class="avatar">
            <user-avatar :src="'item.avatar'"></user-avatar>
          </div>
          <div class="text-info">
            <div class="name sub-text">{{ "item.user" }}</div>
            <div class="time text-box">{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import userAvatar from "@/components/user-avatar.vue";
import { useSocketStore } from "@/store/socket";
import { useUserStore } from "@/store/user";

const socketStore = useSocketStore();
const { user } = useUserStore();
socketStore.getHistoryMessage();
</script>

<style scoped lang="scss">
.sub-text {
  line-height: 1.2;
  font-size: 12px;
  color: #aaa;
}
.right-user {
  direction: rtl;
}
.record-list {
  display: flex;
  flex-direction: column;
  padding: 12px;
  .record-item {
    padding: 12px 0;
    .record-info {
      display: flex;
      align-items: center;

      .avatar {
        width: 38px;
        height: 38px;
      }
      .text-info {
        padding: 0 8px;

        .text-box {
          padding: 8px;
          border-radius: 8px;
          background: white;
        }
      }
    }
  }
}
</style>
