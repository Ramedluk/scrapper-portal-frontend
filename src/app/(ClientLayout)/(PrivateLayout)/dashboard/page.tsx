"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { Button, Flex, Spin } from "antd";

import { useGetDashboard } from "@/api/dashboard/queries";
import { useScrapeAll } from "@/api/scraping/queries";
import PageTitle from "@/components/PageTitle";
import { usePagination } from "@/hooks/usePagination";
import { useConfirmationModal } from "@/modals/ConfirmationModal";

import GridData from "./GridData";

const DashboardPage = () => {
  const t = useTranslations();
  const { page, limit, setPage } = usePagination();
  const { data, isLoading } = useGetDashboard({ page, limit });
  const { items = [], total = 0 } = data || {};
  const { mutateAsync: scrapeAll } = useScrapeAll();
  const { show: showConfirmation, modal: confirmationModal } = useConfirmationModal();

  const handleScrapeAll = React.useCallback(() => {
    showConfirmation({
      title: t("modals.scrapeAll.title"),
      confirmText: t("modals.scrapeAll.content"),
      onConfirm: () => scrapeAll(undefined),
    });
  }, []);

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Flex justify="space-between" align="center" style={{ marginBottom: 16 }}>
        <PageTitle total={total} title={t("dashboard.title")} />
        <Button onClick={handleScrapeAll}>{t("dashboard.manualScraping")}</Button>
      </Flex>
      <GridData
        items={items}
        loading={isLoading}
        page={page}
        limit={limit}
        total={total}
        onPageChange={setPage}
      />
      {confirmationModal}
    </>
  );
};

export default DashboardPage;
