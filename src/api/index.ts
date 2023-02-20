import type { ResponseDataType } from "./../types/response";
import type { UserLoginParams, UserRegisterParams } from "./types";
import request from "@/utils/request";
import type { AddFriendDto, AddFriendGroupDto } from "@/types/friends";

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
}): Promise<ResponseDataType> => {
  return request({
    url: "/user/list",
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

export const getFriendsGroupList = (data: {
  userId: string;
}): Promise<ResponseDataType> => {
  return request({
    url: "/friends/group-list",
    data,
  });
};

export const addFriend = (data: AddFriendDto): Promise<ResponseDataType> => {
  return request({
    url: "/friends/add",
    data,
  });
};

export const getFriendsList = (data: {
  userId: string;
  groupId: string;
}): Promise<ResponseDataType> => {
  return request({
    url: "/friends/list",
    data,
  });
};

export const getUserInfoById = (id: string): Promise<ResponseDataType> => {
  return request({
    url: "/user/" + id,
    method: "get",
  });
};
