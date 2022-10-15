export interface ISignUpRequest {
  password: string;
  email: string;
}

export interface ILoginRequest {
  password: string;
  email: string;
}

export interface ILoginSuccess {
  token: string;
  uid: string;
  email: string | null;
}
