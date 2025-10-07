export interface ICompany {
  id: string;
  uuid: string;
  name: string;
  createdAt: string;
}

export interface ICreateCompany {
  name: string;
}

export interface IUpdateCompany {
  uuid: string;
  name: string;
}
