import axiosInstance from "@/api/base";
import { getTokenData } from "@/utils/jwtDecode";

import { AUTH_CONFIG } from "./constants";

export const updateAuthHeader = (value: string): void => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${value}`;
};

export const getRefetchInterval = (accessToken: string): number | false => {
  const { exp = 0 } = getTokenData(accessToken);
  const interval = exp * 1000 - (Date.now() + AUTH_CONFIG.EXPIRATION_OFFSET);

  return interval > 0 ? interval : false;
};
