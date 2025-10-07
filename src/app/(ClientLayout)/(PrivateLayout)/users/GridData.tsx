import React from "react";
import { useTranslations } from "next-intl";

import { EditOutlined } from "@ant-design/icons";
import { Button, Table, TableColumnsType } from "antd";

import { IUser } from "@/api/users/types";
import { useUpdateUserModal } from "@/modals/UpdateUserModal";
import { IGridDataProps } from "@/types";
import { formatDate } from "@/utils/date";

const GridData = ({ items, loading, page, limit, total, onPageChange }: IGridDataProps<IUser>) => {
  const t = useTranslations();
  const { show, modal } = useUpdateUserModal();

  const dataSource = items.map((item) => ({ key: item.uuid, ...item }));

  const columns: TableColumnsType<IUser> = [
    {
      title: t("users.columns.name"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("users.columns.email"),
      dataIndex: "email",
      key: "email",
      width: "30%",
    },
    {
      title: t("users.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "30%",
      render: (_, { createdAt }) => formatDate(createdAt, { onlyDate: false }),
    },
    {
      title: t("common.actions"),
      key: "actions",
      width: 80,
      render: (_, user) => <Button icon={<EditOutlined />} onClick={() => show({ user })} />,
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
