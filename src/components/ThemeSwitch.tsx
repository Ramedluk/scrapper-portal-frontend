"use client";

import React from "react";

import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Switch } from "antd";

import { usePersistedStore } from "@/store";

const ThemeSwitch: React.FC = () => {
  const mode = usePersistedStore((state) => state.mode);
  const toggleMode = usePersistedStore((state) => state.toggleMode);

  return (
    <Switch
      checked={mode === "dark"}
      onChange={toggleMode}
      checkedChildren={<SunOutlined />}
      unCheckedChildren={<MoonOutlined />}
    />
  );
};

export default ThemeSwitch;
