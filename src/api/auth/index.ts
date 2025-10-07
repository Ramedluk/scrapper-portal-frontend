import axiosInstance from "@/api/base";

import { endpoints } from "./constants";
import { normalizeAuth } from "./normalizers";
import { IAuth, ISignInPayload, ISignUpPayload } from "./types";

const authAPI = {
  async signUp(payload: ISignUpPayload): Promise<IAuth> {
    const url = endpoints.signUp();
    const result = await axiosInstance.post(url, payload, {
      withCredentials: true,
    });
    return normalizeAuth(result.data);
  },

  async signIn(payload: ISignInPayload): Promise<IAuth> {
    const url = endpoints.signIn();
    const result = await axiosInstance.post(url, payload, {
      withCredentials: true,
      metaData: { isPublic: true, removeAuthToken: true },
    });
    return normalizeAuth(result.data);
  },

  async refreshToken(): Promise<IAuth> {
    const url = endpoints.refreshToken();

    const result = await axiosInstance.post(url, undefined, {
      timeout: 10000,
      withCredentials: true,
      metaData: { isPublic: true, isRefreshToken: true, removeAuthToken: true },
    });
    return normalizeAuth(result.data);
  },

  logout(): Promise<void> {
    const url = endpoints.logout();
    return axiosInstance.post(url, undefined, {
      withCredentials: true,
    });
  },
};

export default authAPI;
