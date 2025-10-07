import React from "react";
import { useTranslations } from "next-intl";

import { EditOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType, Typography } from "antd";

import { ISite } from "@/api/sites/types";
import { useUpdateSiteModal } from "@/modals/UpdateSiteModal";
import { IGridDataProps } from "@/types";
import { formatDate } from "@/utils/date";

const { Link } = Typography;

const GridData = ({ items, loading, page, limit, total, onPageChange }: IGridDataProps<ISite>) => {
  const t = useTranslations();
  const { show, modal } = useUpdateSiteModal();

  const dataSource = items.map((item) => ({ key: item.uuid, ...item }));

  const columns: TableColumnsType<ISite> = [
    {
      title: t("sites.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("sites.columns.baseUrl"),
      dataIndex: "baseUrl",
      key: "baseUrl",
      width: "25%",
      render: (text) => (
        <Link href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </Link>
      ),
    },
    {
      title: t("sites.columns.reviewUrlTemplate"),
      dataIndex: "reviewUrlTemplate",
      key: "reviewUrlTemplate",
      width: "30%",
    },
    {
      title: t("sites.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "20%",
      render: (_, { createdAt }) => formatDate(createdAt, { onlyDate: false }),
    },
    {
      title: t("common.actions"),
      key: "actions",
      width: 80,
      render: (_, site) => <Button icon={<EditOutlined />} onClick={() => show({ site })} />,
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        pagination={{
          current: page,
          pageSize: limit,
          total,
          onChange: (newPage) => {
            onPageChange(newPage);
          },
        }}
      />
      {modal}
    </>
  );
};

export default GridData;
