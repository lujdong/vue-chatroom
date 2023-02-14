import type { SessionType } from "@/enums";

export interface SessionList {
  id: string;

  userId: string;

  toId: string;

  type: SessionType;

  lastMessage: string;

  read: number;

  updateTime: string;

  createTime: string;
}
