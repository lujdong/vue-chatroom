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
      <user-avatar class="avatar-wrap"></user-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import userAvatar from "./user-avatar.vue";
</script>

<style scoped lang="scss">
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-wrap {
  position: absolute;
  right: 32px;
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
