"use client";

import React, { useCallback, useState } from "react";

import { Modal } from "antd";

import { TModalProps } from "@/constants/types";

interface IConfirmationModalProps {
  title: string;
  confirmText: string;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  title,
  confirmText,
  onConfirm,
  onClose,
}: TModalProps<IConfirmationModalProps>) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleConfirm = React.useCallback(async () => {
    setConfirmLoading(true);
    await onConfirm();
    setConfirmLoading(false);
    onClose();
  }, [onConfirm, onClose]);

  return (
    <Modal
      title={title}
      confirmLoading={confirmLoading}
      centered
      open={true}
      onCancel={onClose}
      onOk={handleConfirm}
    >
      <p>{confirmText}</p>
    </Modal>
  );
};

export const useConfirmationModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<IConfirmationModalProps | null>(null);

  const show = useCallback((props: IConfirmationModalProps) => {
    setModalProps(props);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setModalProps(null);
    setVisible(false);
  }, []);

  const modal = visible && modalProps ? <ConfirmationModal {...modalProps} onClose={hide} /> : null;

  return { show, modal };
};
