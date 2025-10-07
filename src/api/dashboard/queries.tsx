import api from "@/api";
import { IPaginationParams, TUsePaginatedQueryResult } from "@/api/types";
import { useGetAllEntities } from "@/api/useGetAllEntities";

import { DASHBOARD_KEYS } from "./constants";
import { IDashboardCompanyItem } from "./types";

export const useGetDashboard = (
  pagination: IPaginationParams = {},
): TUsePaginatedQueryResult<IDashboardCompanyItem> => {
  return useGetAllEntities<IDashboardCompanyItem>({
    queryKey: [DASHBOARD_KEYS.DASHBOARD],
    apiMethod: api.dashboard.getDashboard,
    pagination,
  });
};
