export interface IUserRequest {
  uid: string;
  email: string | null;
}

export interface IUpdateUserRequest {
  uid: string | null;
  email: string | null;
  nickname: string;
  introduce: string;
}
