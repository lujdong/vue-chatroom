import { io, Socket } from "socket.io-client";
import { defineStore } from "pinia";

export interface SocketState {
  socket: Socket | null;
}

export const useSocketStore = defineStore<"socket", SocketState>("socket", {
  state: () => {
    return {
      socket: null,
    };
  },

  getters: {},

  actions: {
    async connectSocket() {
      const socketInstance = io("/socket");
      socketInstance.on("connect", async () => {
        console.log("连接成功");

        // 获取聊天室所需所有信息
        socketInstance.emit("chatData", { username: "dong" });

        this.socket = socketInstance;
      });
    },
  },
});
