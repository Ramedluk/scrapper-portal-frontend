"use client";

import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Modal } from "antd";

import { useUpdateCompany } from "@/api/companies/queries";
import { ICompany, IUpdateCompany } from "@/api/companies/types";
import FormInput from "@/components/Form/FormInput";
import { TModalProps } from "@/constants/types";

import { getDefaultValues, resolver } from "./helpers";

interface IUpdateCompanyModalProps {
  company: ICompany;
}

const UpdateCompanyModal = ({ company, onClose }: TModalProps<IUpdateCompanyModalProps>) => {
  const t = useTranslations();
  const { mutateAsync: updateCompany } = useUpdateCompany();

  const defaultValues = getDefaultValues(company);
  const methods = useForm({ resolver, defaultValues });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting, isDirty } = formState;

  const handleSubmitForm = React.useCallback(
    async (formValues: IUpdateCompany) => {
      await updateCompany(formValues, {
        onSuccess: onClose,
        onSettled: () => reset(),
      });
    },
    [onClose, reset, updateCompany],
  );

  return (
    <Modal
      title={t("modals.updateCompany.title")}
      centered
      open
      onCancel={onClose}
      onOk={handleSubmit(handleSubmitForm)}
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting || !isDirty }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormInput
            name="name"
            label={t("modals.updateCompany.fields.name")}
            placeholder={t("modals.updateCompany.placeholders.name")}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export const useUpdateCompanyModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<IUpdateCompanyModalProps | null>(null);

  const show = useCallback((props: IUpdateCompanyModalProps) => {
    setModalProps(props);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setModalProps(null);
    setVisible(false);
  }, []);

  const modal =
    visible && modalProps ? <UpdateCompanyModal {...modalProps} onClose={hide} /> : null;

  return { show, modal };
};
