/**
 * 发送的消息类型
 */
export enum MessageType {
  TEXT,
  IMAGE,
}

/**
 * 会话类型：
 * 群聊
 * 好友聊天
 */
export enum SessionType {
  GROUP,
  SINGLE,
}

export enum ResponseCode {
  FAIL = 100,
  SUCCESS = 200,
  ERROR = 500,
}

/**
 * 性别
 */
export enum SexType {
  SECRECY,
  BOY,
  GIRL,
}
