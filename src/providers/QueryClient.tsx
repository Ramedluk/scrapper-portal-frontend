"use client";
import React from "react";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TPropsWithChildren } from "@/constants/types";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return createQueryClient();
  }
  return (clientQueryClientSingleton ??= createQueryClient());
};

function QCProvider({ children }: TPropsWithChildren) {
  const queryClient = getQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default React.memo(QCProvider);
