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
import { ref, onMounted, provide } from "vue";
import { useUserStore } from "@/store/user";
import { useSocketStore } from "@/store/socket";
import type { UserBaseInfo } from "@/types/response";
import type { ChatGroupMap } from "@/types/chat-group";

const activeRoom = ref<ChatGroupMap | null>(null);

const userStore = useUserStore();
const socketStore = useSocketStore();

socketStore.connectSocket();

interface JoinRoomResponse {
  user: UserBaseInfo;
  group: ChatGroupMap;
}

const chatList = ref<any>([]);

const joinChatroom = () => {
  console.log(" this.socket: ", socketStore);
  const a = socketStore.socket?.emit(
    "joinChatroom",
    {
      userId: userStore.user?.id,
      groupId: 0,
    },
    (res: ChatGroupMap) => {
      // activeRoom.value = res;
      chatList.value.push(res);
      console.log("chatList: ", chatList);
      console.log("=================", res);
    }
  );
  console.log("a:", a);
};

const getRoomUsers = () => {
  const s = socketStore.socket?.emit(
    "roomUsers",
    {
      groupId: 0,
    },
    (res: any) => {
      console.log("11111111111111111", res);
    }
  );
  console.log("s: ", s);
};

onMounted(() => {
  joinChatroom();
  getRoomUsers();
});

const roomFlag = ref(false);
const onRoomChange = (room: any) => {
  console.log(room);
  roomFlag.value = true;
  activeRoom.value = room;
  console.log(userStore.$state);
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
