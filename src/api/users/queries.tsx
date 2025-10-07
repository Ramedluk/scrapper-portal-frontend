import { useNotification } from "@refinedev/core";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

import api from "@/api";
import { IPaginationParams, TError, TUsePaginatedQueryResult } from "@/api/types";
import { useGetAllEntities } from "@/api/useGetAllEntities";

import { USERS_KEYS } from "./constants";
import { ICreateUser, IUpdateUser, IUser } from "./types";

export const useCreateUser = (): UseMutationResult<void, TError, ICreateUser> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.users.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEYS.USERS] });
      open({
        type: "success",
        description: "Success",
        message: "User created successfully",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to create user",
      });
    },
  });
};

export const useGetUsers = (
  pagination: IPaginationParams = {},
): TUsePaginatedQueryResult<IUser> => {
  return useGetAllEntities<IUser>({
    queryKey: [USERS_KEYS.USERS],
    apiMethod: api.users.getUsers,
    pagination,
  });
};

export const useUpdateUser = (): UseMutationResult<void, TError, IUpdateUser> => {
  const queryClient = useQueryClient();
  const { open: open = () => {} } = useNotification();

  return useMutation({
    mutationFn: api.users.updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEYS.USERS] });
      open({
        type: "success",
        description: "Success",
        message: "User updated successfully",
      });
    },
    onError: ({ response }) => {
      open({
        type: "error",
        description: "Error",
        message: response?.data?.message || "Failed to update user",
      });
    },
  });
};
