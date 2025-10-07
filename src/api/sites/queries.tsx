import React from "react";

import { useNotification } from "@refinedev/core";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import api from "@/api";
import { IPaginationParams, TError, TUsePaginatedQueryResult } from "@/api/types";
import { useGetAllEntities } from "@/api/useGetAllEntities";

import { SITES_KEYS } from "./constants";
import { ISite, IUpdateSite } from "./types";

export const useGetSites = (
  pagination: IPaginationParams = {},
): TUsePaginatedQueryResult<ISite> => {
  return useGetAllEntities<ISite>({
    queryKey: [SITES_KEYS.SITES],
    apiMethod: api.sites.getSites,
    pagination,
  });
};

export const useGetSite = (uuid: string): UseQueryResult<ISite> => {
  const queryFn = React.useCallback(() => {
    return api.sites.getSite(uuid);
  }, [uuid]);

  return useQuery({
    queryFn,
    queryKey: [SITES_KEYS.SITES, uuid],
  });
};

export const useUpdateSite = (): UseMutationResult<void, TError, IUpdateSite> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.sites.updateSite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SITES_KEYS.SITES] });
      open({
        type: "success",
        description: "Success",
        message: "Site updated successfully",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to update site",
      });
    },
  });
};
