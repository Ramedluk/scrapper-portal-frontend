import { IRequestConfigMetaData } from "@/api/types";

declare module "axios" {
  export interface AxiosRequestConfig {
    metaData?: IRequestConfigMetaData;
  }
}
