<template>
  <div class="record-list">
    <div
      :class="['record-item', { 'right-user': item.type === 1 }]"
      v-for="item in recordList"
      :key="item.id"
    >
      <div class="record-info">
        <div class="avatar">
          <user-avatar :src="item.avatar"></user-avatar>
        </div>
        <div class="text-info">
          <div class="name sub-text">{{ item.user }}</div>
          <div class="time text-box">{{ item.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userAvatar from "@/components/user-avatar.vue";
const recordList = [
  {
    id: 1,
    user: "dong",
    type: 1,
    avatar:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    content: "这是一条消息",
  },
];
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
