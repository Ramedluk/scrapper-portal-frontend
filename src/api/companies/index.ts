import axiosInstance from "@/api/base";
import { normalizePaginated } from "@/api/normalizers";
import { IPaginationParams, TPaginatedResponse } from "@/api/types";

import { endpoints } from "./constants";
import { normalizeCompany } from "./normalizers";
import { ICompany, ICreateCompany, IUpdateCompany } from "./types";

const companiesAPI = {
  createCompany(company: ICreateCompany): Promise<void> {
    const url = endpoints.createCompany();
    return axiosInstance.post(url, company);
  },
  async getCompanies(params: IPaginationParams): Promise<TPaginatedResponse<ICompany>> {
    const url = endpoints.getCompanies();
    const response = await axiosInstance.get(url, { params });
    return normalizePaginated<ICompany>(response.data, normalizeCompany);
  },
  async getCompany(uuid: string): Promise<ICompany> {
    const url = endpoints.getCompany(uuid);
    const response = await axiosInstance.get(url);
    return normalizeCompany(response.data);
  },
  async updateCompany({ uuid, ...payload }: IUpdateCompany): Promise<void> {
    const url = endpoints.updateCompany(uuid);
    await axiosInstance.put(url, payload);
  },
  deleteCompany(uuid: string): Promise<void> {
    const url = endpoints.deleteCompany(uuid);
    return axiosInstance.delete(url);
  },
};

export default companiesAPI;
