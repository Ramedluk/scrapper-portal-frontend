"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  AreaChartOutlined,
  FileTextOutlined,
  GlobalOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";

import { ROUTES } from "@/routes/config";
const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: ROUTES.readme,
    icon: <FileTextOutlined />,
    label: "Readme",
  },
  {
    key: ROUTES.dashboard,
    icon: <AreaChartOutlined />,
    label: "Dashboard",
  },
  {
    key: ROUTES.sites,
    icon: <GlobalOutlined />,
    label: "Sites",
  },
  {
    key: ROUTES.companies,
    icon: <ShopOutlined />,
    label: "Companies",
  },
  {
    key: ROUTES.users,
    icon: <UserOutlined />,
    label: "Users",
  },
];

const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname(); // поточний роут
  const [collapsed, setCollapsed] = React.useState(false);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    if (key && key !== "/1") {
      router.push(`${key}`);
    }
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Menu onClick={onClick} mode="inline" items={items} selectedKeys={[pathname]} />
    </Sider>
  );
};

export default Navigation;
