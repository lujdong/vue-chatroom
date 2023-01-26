<template>
  <div class="room-container">
    <room-list></room-list>
    <chat-window class="chat-window"></chat-window>
  </div>
</template>

<script setup lang="ts">
import roomList from "./room-list.vue";
import chatWindow from "./chat-window.vue";
</script>

<style scoped lang="scss">
.room-container {
  flex: 1;
  display: flex;
  .chat-window {
    flex: 1;
  }
}
</style>
