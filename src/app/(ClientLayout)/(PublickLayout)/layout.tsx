"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Spin } from "antd";

import { ROUTES } from "@/routes/config";
import { useVolatileStore } from "@/store";

interface Props {
  children: React.ReactNode;
}

const PublicLayout: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useVolatileStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.readme);
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <Spin size="large" fullscreen />;
  }

  return <>{children}</>;
};

export default PublicLayout;
