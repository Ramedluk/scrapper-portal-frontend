"use client";

import React from "react";

import "@ant-design/v5-patch-for-react-19";
import { useNotificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { App, ConfigProvider, theme } from "antd";

import QCProvider from "@/providers/QueryClient";
import { usePersistedStore } from "@/store";

import ClientContent from "./ClientContent";

interface Props {
  children: React.ReactNode;
}

const ClientLayout: React.FC<Props> = ({ children }) => {
  const { mode, isHydrated } = usePersistedStore((state) => state);
  const isDarkMode = mode === "dark";

  if (!isHydrated) {
    return;
  }

  return (
    <QCProvider>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            fontFamily: "var(--font-inter), sans-serif",
          },
          components: {
            Layout: {
              headerBg: isDarkMode ? "#001529" : "#ffffff",
              siderBg: isDarkMode ? "#001529" : "#ffffff",
              triggerBg: "transparent",
              triggerColor: isDarkMode ? "#ffffff" : "#000000",
            },
            Menu: {
              colorBgContainer: "transparent",
            },
          },
        }}
      >
        <App>
          <Refine notificationProvider={useNotificationProvider}>
            <ClientContent>{children}</ClientContent>
          </Refine>
        </App>
      </ConfigProvider>
    </QCProvider>
  );
};

export default ClientLayout;
