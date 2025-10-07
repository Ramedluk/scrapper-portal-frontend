import axiosInstance from "@/api/base";

import { endpoints } from "./constants";
import { normalizeReview } from "./normalizers";
import { IReview, IScrapingHistoryParams } from "./types";

const dashboardAPI = {
  scrapeAll(): Promise<void> {
    const url = endpoints.scrapeAll();
    return axiosInstance.post(url);
  },
  scrapeBySite(siteUuid: string): Promise<void> {
    const url = endpoints.scrapeBySite(siteUuid);
    return axiosInstance.post(url);
  },
  scrapeByCompany(companyUuid: string): Promise<void> {
    const url = endpoints.scrapeByCompany(companyUuid);
    return axiosInstance.post(url);
  },
  async getScrapingHistory(params: IScrapingHistoryParams): Promise<IReview[]> {
    const url = endpoints.getScrapingHistory();
    const response = await axiosInstance.get(url, { params });
    return response.data.items.map(normalizeReview);
  },
};

export default dashboardAPI;
