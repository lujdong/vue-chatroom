import type { ResponseDataType } from "./../types/response";
import type { UserLoginParams, UserRegisterParams } from "./types";
import request from "@/utils/request";
import type { AddFriendGroupDto } from "@/types/friends";

export const userRegister = (data: UserRegisterParams) => {
  return request<ResponseDataType>({
    url: "/auth/register",
    data,
  });
};

export const userLogin = <T>(
  data: UserLoginParams
): Promise<ResponseDataType<T>> => {
  return request<ResponseDataType<T>>({
    url: "/auth/login",
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

export const getSessionList = <T>(data: {
  userId: string;
}): Promise<ResponseDataType<T>> => {
  return request<ResponseDataType<T>>({
    url: "/sessions/list",
    data,
  });
};

export const getMessageList = <T>(data: {
  sessionId: string;
}): Promise<ResponseDataType<T>> => {
  return request<ResponseDataType<T>>({
    url: "/sessions/messageList",
    data,
  });
};

export const createFriendGroup = (
  data: AddFriendGroupDto
): Promise<ResponseDataType> => {
  return request({
    url: "/friends/add-group",
    data,
  });
};
