"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { Button, Spin } from "antd";
import { Flex } from "antd/lib";

import { useGetUsers } from "@/api/users/queries";
import PageTitle from "@/components/PageTitle";
import { usePagination } from "@/hooks/usePagination";
import { useCreateUserModal } from "@/modals/CreateUserModal";

import GridData from "./GridData";

const UsersPage = () => {
  const t = useTranslations();
  const { page, setPage, limit } = usePagination();
  const { data, isLoading, isFetching } = useGetUsers({ page, limit });
  const { items = [], total = 0 } = data || {};
  const { show, modal } = useCreateUserModal();

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <PageTitle total={total} title={t("users.title")} />
        <Button onClick={() => show()}>{t("users.create")}</Button>
      </Flex>
      <GridData
        items={items}
        loading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={total}
        onPageChange={(newPage: number) => {
          setPage(newPage);
        }}
      />
      {modal}
    </>
  );
};

export default UsersPage;
