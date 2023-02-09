import { useUserStore } from "./user";
import { io, Socket } from "socket.io-client";
import { defineStore } from "pinia";

export interface SocketState {
  socket: Socket | null;
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
    };
  },

  getters: {},

  actions: {
    // 初始化socket
    async connectSocket() {
      const socket = io("http://localhost:3000");

      socket.on("connect", async () => {
        console.log("连接成功");

        const user = useUserStore();

        console.log("user.user: ", user.user);
        socket.emit("joinChatroom", user.user);

        this.socket = socket;
      });

      // 监听加入聊天室结果
      socket.on("joinChatroom", (res) => {
        console.log(123, res);
      });
    },
  },
});
