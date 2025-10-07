"use client";

import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Modal } from "antd";

import { useCreateCompany } from "@/api/companies/queries";
import { ICreateCompany } from "@/api/companies/types";
import FormInput from "@/components/Form/FormInput";
import { TModalProps } from "@/constants/types";

import { DEFAULT_VALUES as defaultValues, resolver } from "./helpers";

const CreateCompanyModal = ({ onClose }: TModalProps) => {
  const t = useTranslations();
  const { mutateAsync: createCompany } = useCreateCompany();

  const methods = useForm<ICreateCompany>({ resolver, defaultValues });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting, isDirty } = formState;

  const handleSubmitForm = React.useCallback(
    async (formValues: ICreateCompany) => {
      await createCompany(formValues, {
        onSuccess: onClose,
        onSettled: () => reset(),
      });
    },
    [onClose, reset, createCompany],
  );

  return (
    <Modal
      title={t("modals.createCompany.title")}
      centered
      open={true}
      onCancel={onClose}
      onOk={handleSubmit(handleSubmitForm)}
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting || !isDirty }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <FormInput
            name="name"
            label={t("modals.createCompany.fields.name")}
            placeholder={t("modals.createCompany.placeholders.name")}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export const useCreateCompanyModal = () => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const modal = visible ? <CreateCompanyModal onClose={hide} /> : null;

  return { show, modal };
};
