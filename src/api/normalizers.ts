import { TObject, TPaginatedResponse } from "./types";

export interface IPaginatedServerResponse extends TObject {
  items: TObject[];
}

type TGeneralNormalizer<TReturnData> = (
  value: TObject,
  index: number,
  array: TObject[],
) => TReturnData;

export function normalizePaginated<
  TReturnData,
  TData extends IPaginatedServerResponse = IPaginatedServerResponse,
  TNormalizer extends TGeneralNormalizer<TReturnData> = TGeneralNormalizer<TReturnData>,
>(data: TData, normalizer: TNormalizer): TPaginatedResponse<TReturnData> {
  return {
    items: data?.items?.map(normalizer) || [],
    page: (data?.page as number) || 0,
    total: (data?.total as number) || 0,
    totalPages: (data?.totalPages as number) || 1,
  };
}
