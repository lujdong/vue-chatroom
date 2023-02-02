import type { ResponseDataType } from "./../types/response";
import type { AxiosResponse } from "axios";
import type { UserRegisterParams } from "./types";
import request from "@/utils/request";

type ResponseType = AxiosResponse<ResponseDataType>["data"];

export const userRegister = (data: UserRegisterParams): ResponseType => {
  return request<ResponseDataType>({
    url: "/user/register",
    data,
  });
};

export const userLogin = (data: UserLoginParams): ResponseType => {
  return request<ResponseDataType>({
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
