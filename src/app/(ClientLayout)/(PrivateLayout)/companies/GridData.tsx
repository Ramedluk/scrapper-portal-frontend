import React from "react";
import { useTranslations } from "next-intl";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Table, type TableColumnsType } from "antd";

import { useDeleteCompany } from "@/api/companies/queries";
import { ICompany } from "@/api/companies/types";
import { useConfirmationModal } from "@/modals/ConfirmationModal";
import { useUpdateCompanyModal } from "@/modals/UpdateCompanyModal";
import { IGridDataProps } from "@/types";
import { formatDate } from "@/utils/date";

const GridData = ({
  items,
  loading,
  page,
  limit,
  total,
  onPageChange,
}: IGridDataProps<ICompany>) => {
  const t = useTranslations();
  const { mutate: deleteCompany } = useDeleteCompany();
  const { show: showConfirmation, modal: confirmationModal } = useConfirmationModal();
  const { show: showUpdateCompany, modal: updateCompanyModal } = useUpdateCompanyModal();

  const handleDelete = React.useCallback(
    (uuid: string) => {
      showConfirmation({
        title: t("modals.deleteCompany.title"),
        confirmText: t("modals.deleteCompany.content"),
        onConfirm: () => deleteCompany(uuid),
      });
    },
    [deleteCompany, showConfirmation],
  );

  const dataSource = items.map((item) => ({ key: item.uuid, ...item }));

  const columns: TableColumnsType<ICompany> = [
    {
      title: t("companies.columns.name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("companies.columns.createdAt"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: "60%",
      render: (_, { createdAt }) => formatDate(createdAt, { onlyDate: false }),
    },
    {
      title: t("common.actions"),
      key: "actions",
      width: 80,
      render: (_, company) => (
        <Flex align="center" gap={8}>
          <Button icon={<EditOutlined />} onClick={() => showUpdateCompany({ company })} />
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(company.uuid)} />
        </Flex>
      ),
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
      {updateCompanyModal}
      {confirmationModal}
    </>
  );
};

export default GridData;
