export interface IUser {
  uid: string | null;
  email: string;
  nickname: string;
  introduce: string;
}

export interface IUserRequest {
  uid: string;
  email: string | null;
}

export interface IUpdateRequestUser {
  uid: string;
  email: string;
  nickname: string;
  introduce: string;
}
