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
import { DASHBOARD_KEYS } from "@/api/dashboard/constants";
import { TError } from "@/api/types";

import { SCRAPING_KEYS } from "./constants";
import { IReview, IScrapingHistoryParams } from "./types";

export const useScrapeAll = (): UseMutationResult<void, TError> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.scraping.scrapeAll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_KEYS.DASHBOARD] });
      open({
        type: "success",
        description: "Success",
        message: "Scraping successfully finished",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to scrape data",
      });
    },
  });
};

export const useScrapeBySite = (): UseMutationResult<void, TError, string> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.scraping.scrapeBySite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_KEYS.DASHBOARD] });
      open({
        type: "success",
        description: "Success",
        message: "Scraping successfully finished",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to scrape data",
      });
    },
  });
};

export const useScrapeByCompany = (): UseMutationResult<void, TError, string> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.scraping.scrapeByCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DASHBOARD_KEYS.DASHBOARD] });
      open({
        type: "success",
        description: "Success",
        message: "Scraping successfully finished",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to scrape data",
      });
    },
  });
};

export const useGetScrapingHistory = (
  params: IScrapingHistoryParams,
  enabled = true,
): UseQueryResult<IReview[]> => {
  const queryFn = React.useCallback(() => {
    return api.scraping.getScrapingHistory(params);
  }, [params]);

  return useQuery({
    queryFn,
    queryKey: [SCRAPING_KEYS.SCRAPING_HISTORY, params],
    enabled,
  });
};
