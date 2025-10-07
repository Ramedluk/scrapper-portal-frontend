export interface IUser {
  uuid: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  createdAt: string;
}

export interface ICreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUpdateUser {
  uuid: string;
  firstName: string;
  lastName: string;
}
