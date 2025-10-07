"use client";

import React from "react";

import { Badge, Typography } from "antd";

const { Title } = Typography;

interface PageTitleProps {
  total?: number;
  title: string;
}

const PageTitle = ({ total, title }: PageTitleProps) => {
  return (
    <>
      <Title level={2} style={{ display: "flex", alignItems: "center", gap: 16, margin: 0 }}>
        {title}
        {total !== undefined && (
          <Badge
            style={{
              height: "24px",
              lineHeight: "24px",
              padding: "0 8px",
              fontSize: "16px",
              backgroundColor: "purple",
            }}
            count={total}
            showZero
          />
        )}
      </Title>
    </>
  );
};

export default PageTitle;
