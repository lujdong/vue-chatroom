import { ElMessage } from "element-plus";
import type { SessionList } from "./../types/sessions";
import type { ChatGroup } from "./../types/chat-group";
import type { ResponseDataType, UserBaseInfo } from "./../types/response";
import { useUserStore } from "./user";
import { io, Socket } from "socket.io-client";
import { defineStore } from "pinia";

export interface SocketState {
  socket: Socket | null;
  roomUsers: UserBaseInfo[];
  roomList: (ChatGroup & SessionList)[];
  currentRoom: ChatGroup | null;
}

export interface SocketActions {
  connectSocket(): void;
  setCurrentRoom(room: ChatGroup | null): void;
}

export const useSocketStore = defineStore<
  "socket",
  SocketState,
  {},
  SocketActions
>("socket", {
  state: () => {
    return {
      socket: null,
      roomUsers: [],
      roomList: [],
      currentRoom: null,
    };
  },

  getters: {},

  actions: {
    // 初始化socket
    connectSocket() {
      const { user } = useUserStore();
      const socket = io(`http://localhost:3000/?userId=${user?.id}`);

      socket.on("connect", () => {
        this.socket = socket;
      });

      // 初始化socket连接后直接加入默认群组
      socket.emit(
        "joinChatroom",
        {
          userId: user?.id,
          groupId: 0,
        },
        (res: ResponseDataType<(ChatGroup & SessionList)[]>) => {
          if (res.code === 200) {
            this.roomList = res.data || [];
          } else {
            ElMessage.warning(res.message);
          }
          // activeRoom.value = res;
          console.log("=================", res);
        }
      );

      // 获取到默认群组已存在的用户
      socket.emit(
        "roomUsers",
        {
          groupId: 0,
        },
        (res: UserBaseInfo[]) => {
          this.roomUsers = res;
          console.log("this.roomUsers: ", this.roomUsers);
        }
      );
    },

    setCurrentRoom(room) {
      this.currentRoom = room;
    },
  },
});
