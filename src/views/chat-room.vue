<template>
  <div class="room-container">
    <room-list @change="onRoomChange"></room-list>
    <chat-window v-if="roomFlag" class="chat-window"></chat-window>
    <empty-panel v-else></empty-panel>
  </div>
</template>

<script setup lang="ts">
import roomList from "../components/room-list.vue";
import chatWindow from "../components/chat-window.vue";
import emptyPanel from "@/components/empty-panel.vue";
import { ref } from "vue";

const roomFlag = ref(false);

const onRoomChange = (room: any) => {
  console.log(room);
  roomFlag.value = true;
};
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
