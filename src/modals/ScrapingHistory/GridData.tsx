import React from "react";
import { useTranslations } from "next-intl";

import { Badge, Flex, Rate, Table, type TableColumnsType } from "antd";

import { IReview } from "@/api/scraping/types";
import { formatDate } from "@/utils/date";
import { getStatusColor, getStatusText } from "@/utils/reviewStatus";

interface IGridDataProps {
  items: IReview[];
}

const GridData = ({ items }: IGridDataProps) => {
  const t = useTranslations();

  const dataSource = items.map((item) => ({ key: item.id, ...item }));

  const columns: TableColumnsType<IReview> = [
    {
      title: t("modals.scrapingHistory.columns.rating"),
      key: "rating",
      render: (_, record) =>
        record.averageRating ? (
          <Flex align="center" gap={8}>
            <Rate allowHalf defaultValue={record.averageRating} disabled />
            <span>({record.averageRating})</span>
          </Flex>
        ) : (
          <span>N/A</span>
        ),
    },
    {
      title: t("modals.scrapingHistory.columns.totalReviews"),
      key: "totalReviews",
      width: "20%",
      render: (_, record) => record.totalReviews?.toLocaleString() || "N/A",
    },
    {
      title: t("modals.scrapingHistory.columns.scrapedAt"),
      key: "scrapedAt",
      width: "25%",
      render: (_, record) => formatDate(record.scrapedAt, { onlyDate: false }),
    },
    {
      title: t("modals.scrapingHistory.columns.status"),
      key: "status",
      width: "20%",
      render: (_, record) => (
        <Badge
          status={getStatusColor(record.status || "default")}
          text={getStatusText(record.status || "default")}
        />
      ),
    },
  ];

  return (
    <>
      <Table dataSource={dataSource} columns={columns} pagination={false} scroll={{ y: 55 * 5 }} />
    </>
  );
};

export default GridData;
