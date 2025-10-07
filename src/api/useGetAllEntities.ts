import React from "react";

import { useQuery } from "@tanstack/react-query";

import { IPaginationParams, TApiPaginationResponse, TUsePaginatedQueryResult } from "./types";

type TUseGetAllEntitiesProps<T> = {
  apiMethod: (pagination: IPaginationParams) => TApiPaginationResponse<T>;
  queryKey: string[];
  pagination: IPaginationParams;
};

export const useGetAllEntities = <T>({
  apiMethod,
  queryKey,
  pagination = { page: 1, limit: 10 },
}: TUseGetAllEntitiesProps<T>): TUsePaginatedQueryResult<T> => {
  const queryFn = React.useCallback(() => {
    return apiMethod(pagination);
  }, [pagination]);

  const query = useQuery({ queryKey, queryFn, gcTime: 0 });

  React.useEffect(() => {
    query.refetch();
  }, [pagination.page, pagination.limit]);

  return query;
};
