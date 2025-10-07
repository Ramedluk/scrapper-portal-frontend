"use client";

import React from "react";

import { Layout, Spin, theme } from "antd";

import { useRefreshToken, useSessionWatcher } from "@/api/auth/queries";

interface Props {
  children: React.ReactNode;
}

const ClientContent: React.FC<Props> = ({ children }) => {
  const [initialLoad, setInitialLoad] = React.useState(true);
  useSessionWatcher();
  const { isLoading: tokenLoading } = useRefreshToken();
  const { token } = theme.useToken();

  React.useEffect(() => {
    if (initialLoad && !tokenLoading) {
      setInitialLoad(false);
    }
  }, [initialLoad, tokenLoading]);

  if (initialLoad && tokenLoading) {
    return <Spin size="large" fullscreen />;
  }

  return (
    <Layout className="flex h-screen w-screen flex" style={{ color: token.colorText }}>
      {children}
    </Layout>
  );
};

export default ClientContent;
