export interface IAuth {
  accessToken: string;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
