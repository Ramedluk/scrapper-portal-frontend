"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { Flex } from "antd";
import Spin from "antd/lib/spin";

import { useGetSites } from "@/api/sites/queries";
import PageTitle from "@/components/PageTitle";
import { usePagination } from "@/hooks/usePagination";

import GridData from "./GridData";

const SitesPage = () => {
  const t = useTranslations();
  const { page, setPage, limit } = usePagination();
  const { data, isLoading, isFetching } = useGetSites({ page, limit });
  const { items = [], total = 0 } = data || {};

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <PageTitle total={total} title={t("sites.title")} />
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
    </>
  );
};

export default SitesPage;
