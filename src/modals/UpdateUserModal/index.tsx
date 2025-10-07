"use client";

import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Form, Input, Modal } from "antd";

import { useUpdateUser } from "@/api/users/queries";
import { IUpdateUser, IUser } from "@/api/users/types";
import FormInput from "@/components/Form/FormInput";
import { TModalProps } from "@/constants/types";

import { getDefaultValues, resolver } from "./helpers";

interface IUpdateUserModalProps {
  user: IUser;
}

const UpdateUserModal = ({ user, onClose }: TModalProps<IUpdateUserModalProps>) => {
  const t = useTranslations();
  const { mutateAsync: updateUser } = useUpdateUser();

  const defaultValues = getDefaultValues(user);
  const methods = useForm({ resolver, defaultValues });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting, isDirty } = formState;

  const handleSubmitForm = React.useCallback(
    async (formValues: IUpdateUser) => {
      await updateUser(formValues, {
        onSuccess: onClose,
        onSettled: () => reset(),
      });
    },
    [onClose, reset, updateUser],
  );

  return (
    <Modal
      title={t("modals.updateUser.title")}
      centered
      open
      onCancel={onClose}
      onOk={handleSubmit(handleSubmitForm)}
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting || !isDirty }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Form.Item layout="vertical" label={t("modals.updateUser.fields.email")}>
            <Input name="email" disabled placeholder={t("modals.updateUser.placeholders.email")} />
          </Form.Item>
          <FormInput
            name="firstName"
            label={t("modals.updateUser.fields.firstName")}
            placeholder={t("modals.updateUser.placeholders.firstName")}
          />
          <FormInput
            name="lastName"
            label={t("modals.updateUser.fields.lastName")}
            placeholder={t("modals.updateUser.placeholders.lastName")}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export const useUpdateUserModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState<IUpdateUserModalProps | null>(null);

  const show = useCallback((props: IUpdateUserModalProps) => {
    setModalProps(props);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setModalProps(null);
    setVisible(false);
  }, []);

  const modal = visible && modalProps ? <UpdateUserModal {...modalProps} onClose={hide} /> : null;

  return { show, modal };
};
