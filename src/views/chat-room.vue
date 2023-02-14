<template>
  <div class="room-container">
    <room-list @change="onRoomChange" :data="chatList"></room-list>
    <chat-window
      v-if="roomFlag"
      :current-chat="activeRoom"
      class="chat-window"
    ></chat-window>
    <empty-panel v-else></empty-panel>
  </div>
</template>

<script setup lang="ts">
import roomList from "../components/room-list.vue";
import chatWindow from "../components/chat-window.vue";
import emptyPanel from "@/components/empty-panel.vue";
import { ref } from "vue";
import { useUserStore } from "@/store/user";
import { useSocketStore } from "@/store/socket";
import type { ChatGroupMap } from "@/types/chat-group";
import { getSessionList } from "@/api";
import type { SessionList } from "@/types/sessions";

const activeRoom = ref<ChatGroupMap | null>(null);

const { user } = useUserStore();
const socketStore = useSocketStore();

socketStore.connectSocket();

const chatList = ref<SessionList[]>([]);

const roomFlag = ref(false);
const onRoomChange = (room: any) => {
  console.log(room);
  roomFlag.value = true;
  activeRoom.value = room;
};
const getChatSessions = async () => {
  const { data } = await getSessionList<SessionList[]>({
    userId: user?.id as string,
  });
  chatList.value = data as SessionList[];
  console.log("data: ", data);
};
getChatSessions();
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
