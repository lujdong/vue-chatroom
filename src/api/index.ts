import type { ResponseDataType } from "./../types/response";
import type { UserLoginParams, UserRegisterParams } from "./types";
import request from "@/utils/request";

export const userRegister = (data: UserRegisterParams) => {
  return request<ResponseDataType>({
    url: "/user/register",
    data,
  });
};

export const userLogin = <T>(
  data: UserLoginParams
): Promise<ResponseDataType<T>> => {
  return request<ResponseDataType<T>>({
    url: "/user/login",
    data,
  });
};

export const getUserListByUsername = (data: {
  username: string;
}): ResponseType => {
  return request({
    url: "/user/find-all",
    data,
  });
};