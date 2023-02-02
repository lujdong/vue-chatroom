/**
 * 响应主体
 */
export interface ResponseDataType<T = any> {
  /**
   * 0：响应成功
   * 1：响应失败
   */
  code: 0 | -1;
  /* 说明 */
  message?: string;
  data?: T;
  /* 是否成功 */
  success: boolean;
}
/**
 * 用户基本信息实体
 */
export interface UserBaseInfo {
  /* 用户ID */
  id: number;
  /* 用户名（唯一） */
  username: string;
  /* 昵称 */
  nickname: string;
  /* 密码 */
  password: string;
  /**
   * 0: 保密
   * 1：男
   * 2：女
   */
  sex: number;
  /* 年龄 */
  age: number;
  /* 手机号 */
  phone: string;
  /* 生日 */
  birthday: Date;
  /* 头像 */
  avatar: string;
  /* 个人介绍 */
  snapshot: string;
  /* 注册时间 */
  createTime: string;
  /* 备注 */
  remark: string;
}
