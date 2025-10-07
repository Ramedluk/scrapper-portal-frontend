import axiosInstance from "@/api/base";
import { normalizePaginated } from "@/api/normalizers";
import { IPaginationParams, TPaginatedResponse } from "@/api/types";

import { endpoints } from "./constants";
import { normalizeSite } from "./normalizers";
import { ISite, IUpdateSite } from "./types";

const sitesAPI = {
  async getSites(params: IPaginationParams): Promise<TPaginatedResponse<ISite>> {
    const url = endpoints.getSites();
    const response = await axiosInstance.get(url, { params });
    return normalizePaginated<ISite>(response.data, normalizeSite);
  },
  async getSite(siteUuid: string): Promise<ISite> {
    const url = endpoints.getSite(siteUuid);
    const response = await axiosInstance.get(url);
    return normalizeSite(response.data);
  },
  async updateSite({ uuid, ...payload }: IUpdateSite): Promise<void> {
    const url = endpoints.updateSite(uuid);
    await axiosInstance.put(url, payload);
  },
};

export default sitesAPI;
