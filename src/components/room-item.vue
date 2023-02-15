<template>
  <div class="room-item" @click="chatAction">
    <div class="side-left">
      <div class="avatar">
        <user-avatar :src="props.info.cover"></user-avatar>
      </div>
    </div>
    <div class="side-right">
      <div class="line first">
        <span>{{ props.info.groupName }}</span>
        <span class="sub-text">{{ fromNow(props.info.createTime) }}</span>
      </div>
      <div class="line sub-text">{{ props.info.lastMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userAvatar from "@/components/user-avatar.vue";
import type { ChatGroup } from "@/types/chat-group";
import type { SessionList } from "@/types/sessions";
import { fromNow } from "@/utils/datetime";

const emit = defineEmits<{
  (event: "select"): void;
}>();

const props = defineProps<{
  info: ChatGroup & SessionList;
}>();

const chatAction = () => {
  emit("select");
};
</script>

<style scoped lang="scss">
.room-item {
  padding: 8px;
  cursor: pointer;
  height: 60px;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;
  .side-left {
    margin-right: 8px;
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .side-right {
    flex: 1;
    .line {
      line-height: 1.5;
      &.first {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .sub-text {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
  &:hover {
    background: #ccc;
  }
}

.sub-text {
  color: #aaa;
}
</style>
