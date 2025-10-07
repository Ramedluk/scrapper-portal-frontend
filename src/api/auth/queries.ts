import React from "react";

import { useNotification } from "@refinedev/core";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import api from "@/api";
import axiosInstance from "@/api/base";
import { APP_HEADERS, STATUSES } from "@/api/constants";
import { TError } from "@/api/types";
import { useMutationHandlers } from "@/api/useMutationHandle";
import { useVolatileStore } from "@/store";
import { sleep } from "@/utils/sleep";

import { AUTH_CONFIG, AUTH_KEYS } from "./constants";
import { IAuth, ISignInPayload, ISignUpPayload } from "./types";
import { getRefetchInterval } from "./utils";

export const useSignUp = (): UseMutationResult<IAuth, AxiosError, ISignUpPayload> => {
  const { updateAccessToken } = useMutationHandlers();

  return useMutation({
    mutationFn: api.auth.signUp,
    onSuccess: ({ accessToken }) => {
      if (accessToken) {
        updateAccessToken(accessToken);
      }
    },
  });
};

export const useSignIn = (): UseMutationResult<IAuth, TError, ISignInPayload> => {
  const { updateAccessToken } = useMutationHandlers();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.auth.signIn,
    onSuccess: ({ accessToken }) => {
      if (accessToken) {
        updateAccessToken(accessToken);
      }
    },
    onError: (error) => {
      open({
        type: "error",
        description: "Error",
        message: error.response?.data?.message || "Failed to sign in",
      });
    },
  });
};

export const useLogout = () => {
  const client = useQueryClient();
  const logout = useVolatileStore.getState().logout;

  return useMutation({
    mutationFn: api.auth.logout,
    onSettled: async () => {
      client.removeQueries();
      logout();
    },
  });
};

export const useRefreshToken = () => {
  const isAuthenticated = useVolatileStore((state) => state.isAuthenticated);
  const isLoggedOut = useVolatileStore.getState().isLoggedOut;

  const { updateAccessToken } = useMutationHandlers();
  const { mutate: logout } = useLogout();

  const queryFn = React.useCallback(async () => {
    const response = await api.auth.refreshToken();
    if (response.accessToken) {
      updateAccessToken(response.accessToken);
    }

    return response;
  }, []);

  const { isLoading, error } = useQuery<IAuth>({
    queryFn,
    queryKey: [AUTH_KEYS.REFRESH],
    retry: isAuthenticated ? AUTH_CONFIG.RETRIES_LOGGED_IN : AUTH_CONFIG.RETRIES_LOGGED_OUT,
    gcTime: Infinity,
    staleTime: Infinity,
    enabled: !isLoggedOut,
    refetchInterval: (query) => getRefetchInterval(query.state.data?.accessToken || ""),
    refetchIntervalInBackground: true,
  });

  React.useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return {
    isLoading,
  };
};

const useIsRefreshing = () => {
  const client = useQueryClient();
  return React.useCallback(() => {
    return client.getQueryState([AUTH_KEYS.REFRESH])?.status === "pending";
  }, []);
};

export const useSessionWatcher = (): void => {
  const client = useQueryClient();
  const getIsRefreshing = useIsRefreshing();

  React.useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(async (config) => {
      if (config?.metaData?.removeAuthToken) {
        config.headers.delete(APP_HEADERS.AUTH);
      }

      if (config?.metaData?.isPublic) {
        return config;
      }

      while (getIsRefreshing()) {
        await sleep(AUTH_CONFIG.TOKEN_CHECK_SLEEP);
      }

      const accessToken = useVolatileStore.getState().accessToken;
      config.headers.setAuthorization(`Bearer ${accessToken}`, true);
      return config;
    });

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: AxiosError) => {
        const isTokenFailed = error?.response?.status === STATUSES.AUTHENTICATION;
        const isRefreshRequest = error?.config?.metaData?.isRefreshToken;
        if (isRefreshRequest) {
          return Promise.reject(error);
        }
        if (isTokenFailed && !error.config?.metaData?.isPublic) {
          await client.invalidateQueries({
            queryKey: [AUTH_KEYS.REFRESH],
          });
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(responseInterceptor);
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);
};
