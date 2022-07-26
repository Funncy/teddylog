export interface IUserRequest {
  uid: string;
  email: string;
}

export interface IUpdateUserRequest {
  uid: string | null;
  nickname: string;
  introduce: string;
}
