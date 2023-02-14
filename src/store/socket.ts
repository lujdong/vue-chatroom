import type { UserBaseInfo } from "./../types/response";
import { useUserStore } from "./user";
import { io, Socket } from "socket.io-client";
import { defineStore } from "pinia";

export interface SocketState {
  socket: Socket | null;
  roomUsers: UserBaseInfo[];
}

export interface SocketActions {
  connectSocket(): void;
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
        (res: any) => {
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
  },
});
