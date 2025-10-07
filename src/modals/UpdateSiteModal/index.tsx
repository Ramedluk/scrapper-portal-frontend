"use client";

import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Modal } from "antd";

import { useUpdateSite } from "@/api/sites/queries";
import { ISite, IUpdateSite } from "@/api/sites/types";
import FormInput from "@/components/Form/FormInput";
import { TModalProps } from "@/constants/types";

import { getDefaultValues, resolver } from "./helpers";

interface IUpdateSiteModalProps {
  site: ISite;
}

const UpdateSiteModal = ({ site, onClose }: TModalProps<IUpdateSiteModalProps>) => {
  const t = useTranslations();
  const { mutateAsync: updateSite } = useUpdateSite();

  const defaultValues = getDefaultValues(site);
  const methods = useForm({ resolver, defaultValues });
  const { handleSubmit, formState } = methods;
  const { isSubmitting, isDirty } = formState;

  const handleSubmitForm = React.useCallback(
    async (formValues: IUpdateSite) => {
      await updateSite(formValues, {
        onSuccess: onClose,
      });
    },
    [updateSite, onClose],
  );

  return (
    <Modal
      title={t("modals.updateSite.title")}
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
            label={t("modals.updateSite.fields.name")}
            placeholder={t("modals.updateSite.placeholders.name")}
          />
          <FormInput
            name="baseUrl"
            label={t("modals.updateSite.fields.baseUrl")}
            placeholder={t("modals.updateSite.placeholders.baseUrl")}
          />
          <FormInput
            name="reviewUrlTemplate"
            label={t("modals.updateSite.fields.reviewUrlTemplate")}
            placeholder={t("modals.updateSite.placeholders.reviewUrlTemplate")}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export const useUpdateSiteModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<IUpdateSiteModalProps | null>(null);

  const show = useCallback((props: IUpdateSiteModalProps) => {
    setModalProps(props);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setModalProps(null);
    setVisible(false);
  }, []);

  const modal = visible && modalProps ? <UpdateSiteModal {...modalProps} onClose={hide} /> : null;

  return { show, modal };
};
