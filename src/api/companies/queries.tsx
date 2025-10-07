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

import { COMPANIES_KEYS } from "./constants";
import { ICompany, ICreateCompany, IUpdateCompany } from "./types";

export const useCreateCompany = (): UseMutationResult<void, unknown, ICreateCompany> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.companies.createCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_KEYS.COMPANIES] });
    },
  });
};

export const useGetCompanies = (
  pagination: IPaginationParams = {},
): TUsePaginatedQueryResult<ICompany> => {
  return useGetAllEntities<ICompany>({
    queryKey: [COMPANIES_KEYS.COMPANIES],
    apiMethod: api.companies.getCompanies,
    pagination,
  });
};

export const useGetCompany = (companyUuid: string): UseQueryResult<ICompany> => {
  const queryFn = React.useCallback(() => {
    return api.companies.getCompany(companyUuid);
  }, [companyUuid]);

  return useQuery({
    queryFn,
    queryKey: [COMPANIES_KEYS.COMPANIES, companyUuid],
  });
};

export const useUpdateCompany = (): UseMutationResult<void, TError, IUpdateCompany> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.companies.updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_KEYS.COMPANIES] });
      open({
        type: "success",
        description: "Success",
        message: "Company updated successfully",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to update company",
      });
    },
  });
};

export const useDeleteCompany = (): UseMutationResult<void, TError, string> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.companies.deleteCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMPANIES_KEYS.COMPANIES] });
      open({
        type: "success",
        description: "Success",
        message: "Company deleted successfully",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to delete company",
      });
    },
  });
};
