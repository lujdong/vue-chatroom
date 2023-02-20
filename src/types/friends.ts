export interface AddFriendDto {
  userId: string;
  friendId: string;
}

export interface AddFriendGroupDto {
  userId: string;
  groupName: string;
}

export interface FriendsGroupResponse {
  id: string;
  userId: string;
  groupName: string;
  createTime: string;
}
