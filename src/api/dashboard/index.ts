import axiosInstance from "@/api/base";
import { normalizePaginated } from "@/api/normalizers";
import { IPaginationParams, TPaginatedResponse } from "@/api/types";

import { endpoints } from "./constants";
import { normalizeDashboardItem } from "./normalizers";
import { IDashboardCompanyItem } from "./types";

const dashboardAPI = {
  async getDashboard(
    params: IPaginationParams,
  ): Promise<TPaginatedResponse<IDashboardCompanyItem>> {
    const url = endpoints.getDashboard();
    const response = await axiosInstance.get(url, { params });
    return normalizePaginated<IDashboardCompanyItem>(response.data, normalizeDashboardItem);
  },
};

export default dashboardAPI;
