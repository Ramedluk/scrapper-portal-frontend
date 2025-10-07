"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { Button, Flex, Spin } from "antd";

import { useGetCompanies } from "@/api/companies/queries";
import PageTitle from "@/components/PageTitle";
import { usePagination } from "@/hooks/usePagination";
import { useCreateCompanyModal } from "@/modals/CreateCompanyModal";

import GridData from "./GridData";

const CompaniesPage = () => {
  const t = useTranslations();
  const { page, setPage, limit } = usePagination();
  const { data, isLoading, isFetching } = useGetCompanies({ page, limit });
  const { items = [], total = 0 } = data || {};
  const { show, modal } = useCreateCompanyModal();

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <PageTitle total={total} title={t("companies.title")} />
        <Button onClick={() => show()}>{t("companies.create")}</Button>
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

export default CompaniesPage;
