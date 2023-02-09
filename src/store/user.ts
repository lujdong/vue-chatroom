import type { UserBaseInfo } from "./../types/response";
import { defineStore } from "pinia";

export interface UserState {
  user: UserBaseInfo | null;
}

export const useUserStore = defineStore<"user", UserState>("user", {
  persist: true,
  state: () => {
    return {
      user: null,
    };
  },

  getters: {},

  actions: {},
});
