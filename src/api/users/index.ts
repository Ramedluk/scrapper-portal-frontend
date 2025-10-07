import axiosInstance from "@/api/base";
import { normalizePaginated } from "@/api/normalizers";
import { IPaginationParams, TPaginatedResponse } from "@/api/types";

import { endpoints } from "./constants";
import { normalizeUser } from "./normalizers";
import { ICreateUser, IUpdateUser, IUser } from "./types";

const usersAPI = {
  createUser(user: ICreateUser): Promise<void> {
    const url = endpoints.createUser();
    return axiosInstance.post(url, user);
  },
  async getUsers(params: IPaginationParams): Promise<TPaginatedResponse<IUser>> {
    const url = endpoints.getUsers();
    const response = await axiosInstance.get(url, { params });
    return normalizePaginated<IUser>(response.data, normalizeUser);
  },
  async updateUser({ uuid, ...payload }: IUpdateUser): Promise<void> {
    const url = endpoints.updateUser(uuid);
    await axiosInstance.patch(url, payload);
  },
};

export default usersAPI;
