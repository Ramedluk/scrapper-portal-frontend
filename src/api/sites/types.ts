export interface ISite {
  id: string;
  uuid: string;
  name: string;
  baseUrl: string;
  reviewUrlTemplate: string;
  createdAt: string;
}

export interface IUpdateSite {
  uuid: string;
  name: string;
  baseUrl: string;
  reviewUrlTemplate: string;
}
