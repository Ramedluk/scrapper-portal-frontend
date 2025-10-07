"use client";

import React, { useCallback, useState } from "react";
import { useTranslations } from "next-intl";

import { Modal } from "antd";

import { useGetScrapingHistory } from "@/api/scraping/queries";
import { TModalProps } from "@/constants/types";

import GridData from "./GridData";

interface IScrapingHistoryModalProps {
  siteId: string;
  companyId: string;
}

const ScrapingHistoryModal = ({
  siteId,
  companyId,
  onClose,
}: TModalProps<IScrapingHistoryModalProps>) => {
  const t = useTranslations();
  const { data = [], isLoading } = useGetScrapingHistory({ siteId, companyId });

  return (
    <Modal
      width={800}
      title={t("modals.scrapingHistory.title")}
      centered
      open
      loading={isLoading}
      onCancel={onClose}
      okButtonProps={{ hidden: true }}
    >
      <GridData items={data} />
    </Modal>
  );
};

export const useScrapingHistoryModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<IScrapingHistoryModalProps | null>(null);

  const show = useCallback((props: IScrapingHistoryModalProps) => {
    setModalProps(props);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setModalProps(null);
    setVisible(false);
  }, []);

  const modal =
    visible && modalProps ? <ScrapingHistoryModal {...modalProps} onClose={hide} /> : null;

  return { show, modal };
};
