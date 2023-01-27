<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div class="content-list">
        <router-link to="chat-room" class="sidebar-content-item">
          <el-icon>
            <ChatDotSquare />
          </el-icon>
        </router-link>
        <router-link to="group-friends" class="sidebar-content-item active">
          <el-icon>
            <User />
          </el-icon>
        </router-link>
        <router-link to="user-settings" class="sidebar-content-item">
          <el-icon>
            <Setting />
          </el-icon>
        </router-link>
      </div>
      <div class="right-bar">
        <el-button link type="warning" @click="handleLogout"
          >退出登录</el-button
        >
        <user-avatar class="avatar-wrap"></user-avatar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import userAvatar from "./user-avatar.vue";
const router = useRouter();
const handleLogout = () => {
  router.replace("/");
};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.right-bar {
  position: absolute;
  right: 32px;
  display: flex;
  align-items: center;
  .avatar-wrap {
    margin-left: 32px;
  }
}
.sidebar {
  height: 60px;
  background: gray;
  &-content {
    position: relative;
    @extend .flex;
    height: 100%;
    font-size: 28px;
    .content-list {
      @extend .flex;
      height: 100%;
    }
    &-item {
      @extend .flex;
      height: 100%;
      padding: 0 12px;
      cursor: pointer;
      color: white;
      &.router-link-active {
        color: #409eff;
      }
    }
  }
}
</style>
