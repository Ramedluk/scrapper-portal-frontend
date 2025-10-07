import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";

export interface IRequestConfigMetaData {
  isPublic?: boolean;
  removeAuthToken?: boolean;
  isRefreshToken?: boolean;
}

export interface IPaginationParams {
  limit?: number;
  page?: number;
}

export type TPaginatedResponse<T> = {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
};

export type TUsePaginatedQueryResult<T> = UseQueryResult<TPaginatedResponse<T>>;
export type TApiPaginationResponse<T> = Promise<TPaginatedResponse<T>>;

export type TObject = Record<string, unknown>;

export type TError = AxiosError<{
  error: string;
  message: string;
  statusCode: number;
}>;
