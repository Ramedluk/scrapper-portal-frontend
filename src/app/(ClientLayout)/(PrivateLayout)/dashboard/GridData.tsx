import React from "react";
import { useTranslations } from "next-intl";

import { EyeOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Button, Rate, Table, Typography } from "antd";
import { Flex } from "antd/lib";

import { IDashboardCompanyItem, IDashboardSiteWithCompanyId } from "@/api/dashboard/types";
import { useScrapingHistoryModal } from "@/modals/ScrapingHistory";
import { IGridDataProps } from "@/types";
import { formatDate } from "@/utils/date";
import { getStatusColor, getStatusText } from "@/utils/reviewStatus";

const { Link, Text } = Typography;

const GridData = ({
  items,
  loading,
  page,
  limit,
  total,
  onPageChange,
}: IGridDataProps<IDashboardCompanyItem>) => {
  const t = useTranslations();
  const { show, modal } = useScrapingHistoryModal();

  const expandColumns: TableColumnsType<IDashboardSiteWithCompanyId> = [
    {
      title: t("dashboard.columns.siteName"),
      dataIndex: ["site", "name"],
      key: "siteName",
      render: (_, record) => (
        <Flex align="center" gap={8}>
          {record.site.name}
          <Link href={record.fullUrl} target="_blank" rel="noopener noreferrer">
            [{t("dashboard.scrapingLink")}]
          </Link>
        </Flex>
      ),
    },
    {
      title: t("dashboard.columns.rating"),
      key: "rating",
      width: "20%",
      render: (_, record) =>
        record.lastScrapingResult?.averageRating ? (
          <Flex align="center" gap={8}>
            <Rate allowHalf defaultValue={record.lastScrapingResult.averageRating} disabled />
            <span>({record.lastScrapingResult.averageRating})</span>
          </Flex>
        ) : (
          <span>N/A</span>
        ),
    },
    {
      title: t("dashboard.columns.totalReviews"),
      key: "totalReviews",
      width: "10%",
      render: (_, record) => record.lastScrapingResult?.totalReviews?.toLocaleString() || "N/A",
    },
    {
      title: t("dashboard.columns.lastScraped"),
      key: "lastScraped",
      width: "15%",
      render: (_, record) =>
        record.lastScrapingResult?.scrapedAt
          ? formatDate(record.lastScrapingResult.scrapedAt, { onlyDate: false })
          : "Never",
    },
    {
      title: t("dashboard.columns.status"),
      key: "status",
      width: "10%",
      render: (_, record) => (
        <Badge
          status={getStatusColor(record.lastScrapingResult?.status || "default")}
          text={getStatusText(record.lastScrapingResult?.status || "default")}
        />
      ),
    },
    {
      title: t("dashboard.columns.history"),
      key: "history",
      width: 80,
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => show({ siteId: record.site.id, companyId: record.companyId })}
        />
      ),
    },
  ];

  const expandedRowRender = (company: IDashboardCompanyItem) => {
    if (!company.sites.length) {
      return (
        <Flex justify="center" align="center">
          <Text type="warning">{t("dashboard.noScrapingYet")}</Text>
        </Flex>
      );
    }

    const expandedDataSource = company.sites.map((site) => ({ companyId: company.id, ...site }));

    return (
      <Table<IDashboardSiteWithCompanyId>
        columns={expandColumns}
        dataSource={expandedDataSource}
        pagination={false}
        rowKey={(record) => record.site.uuid}
      />
    );
  };

  const dataSource = items.map((item) => ({ key: item.uuid, ...item }));

  const columns: TableColumnsType<IDashboardCompanyItem> = [
    {
      title: t("dashboard.companyName"),
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <>
      <Table<IDashboardCompanyItem>
        columns={columns}
        expandable={{
          expandedRowRender,
          defaultExpandAllRows: true,
        }}
        dataSource={dataSource}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: (newPage) => {
            onPageChange(newPage);
          },
        }}
        size="middle"
      />

      {modal}
    </>
  );
};

export default GridData;
