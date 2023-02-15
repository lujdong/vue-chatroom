import type { MessageType } from "@/enums";

export interface ChatGroupMap {
  id: number;

  groupId: string;

  userId: string;
}

export interface ChatGroup {
  id: string;

  userId: string;

  groupName: string;

  cover: string;

  createTime: string;
}

export interface MessageList {
  id: string;

  fromId: string;

  toId: string;

  content: string;

  type: MessageType;

  createTime: string;
}
