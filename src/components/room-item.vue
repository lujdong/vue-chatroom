<template>
  <div class="room-item" @click="chatAction">
    <div class="side-left">
      <div class="avatar">
        <user-avatar :src="props.info.avatar"></user-avatar>
      </div>
    </div>
    <div class="side-right">
      <div class="line first">
        <span>{{ props.info.title }}</span>
        <span class="sub-text">{{ props.info.date }}</span>
      </div>
      <div class="line sub-text">{{ props.info.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userAvatar from "@/components/user-avatar.vue";

const emit = defineEmits<{
  (event: "select"): void;
}>();

const props = defineProps<{
  info: {
    title: string;
    date: string;
    content: string;
    avatar: string;
  };
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
