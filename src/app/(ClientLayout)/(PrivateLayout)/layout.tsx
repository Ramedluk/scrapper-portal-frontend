"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, Layout, Spin, Typography } from "antd";

import { useLogout } from "@/api/auth/queries";
import Navigation from "@/components/Navigation";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useConfirmationModal } from "@/modals/ConfirmationModal";
import { ROUTES } from "@/routes/config";
import { useVolatileStore } from "@/store";

const { Header, Content } = Layout;
const { Title } = Typography;

interface Props {
  children: React.ReactNode;
}

const PrivateLayout: React.FC<Props> = ({ children }) => {
  const isAuthenticated = useVolatileStore((state) => state.isAuthenticated);
  const router = useRouter();
  const t = useTranslations();
  const { mutate: logout } = useLogout();

  const { show, modal } = useConfirmationModal();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.home);
    }
  }, [isAuthenticated, router]);

  const handleLogoutClick = () => {
    show({
      title: t("modals.signOut.title"),
      confirmText: t("modals.signOut.content"),
      onConfirm: () => logout(),
    });
  };

  if (!isAuthenticated) {
    return <Spin size="large" fullscreen />;
  }

  return (
    <>
      <Navigation />
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 24px",
          }}
        >
          <Link href={ROUTES.readme}>
            <Flex align="center" justify="center" gap={8}>
              <Image src="/logo.svg" alt="Logo" width={48} height={48} />
              <Title level={3} style={{ margin: 0 }}>
                {t("appTitle")}
              </Title>
            </Flex>
          </Link>
          <Flex align="center" gap={16}>
            <ThemeSwitch />
            <Button shape="circle" onClick={handleLogoutClick} icon={<LogoutOutlined />} />
          </Flex>
        </Header>
        <Content style={{ padding: "24px" }}>{children}</Content>
      </Layout>
      {modal}
    </>
  );
};

export default PrivateLayout;
