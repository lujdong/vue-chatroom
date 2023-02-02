/**
 * 登录请求实体
 */
export interface UserLoginParams {
  username: string;
  password: string;
}

/**
 * 注册请求实体
 */
export interface UserRegisterParams extends UserLoginParams {
  rePassword: string;
}
