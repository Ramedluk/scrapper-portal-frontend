"use client";

import React, { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import { Flex, Modal } from "antd";

import { useCreateUser } from "@/api/users/queries";
import { ICreateUser } from "@/api/users/types";
import FormInput from "@/components/Form/FormInput";
import { TModalProps } from "@/constants/types";

import { DEFAULT_VALUES as defaultValues, resolver } from "./helpers";

const CreateUserModal = ({ onClose }: TModalProps) => {
  const t = useTranslations();
  const { mutateAsync: createUser } = useCreateUser();

  const methods = useForm<ICreateUser>({ resolver, defaultValues });
  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting, isDirty } = formState;

  const handleSubmitForm = React.useCallback(
    async (formValues: ICreateUser) => {
      await createUser(formValues, {
        onSuccess: onClose,
        onSettled: () => reset(),
      });
    },
    [onClose, reset, createUser],
  );

  return (
    <Modal
      title={t("modals.createUser.title")}
      centered
      open={true}
      onCancel={onClose}
      onOk={handleSubmit(handleSubmitForm)}
      confirmLoading={isSubmitting}
      okButtonProps={{ disabled: isSubmitting || !isDirty }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Flex align="center" gap={16}>
            <FormInput
              name="firstName"
              label={t("modals.createUser.fields.firstName")}
              placeholder={t("modals.createUser.placeholders.firstName")}
            />
            <FormInput
              name="lastName"
              label={t("modals.createUser.fields.lastName")}
              placeholder={t("modals.createUser.placeholders.lastName")}
            />
          </Flex>
          <FormInput
            name="email"
            label={t("modals.createUser.fields.email")}
            placeholder={t("modals.createUser.placeholders.email")}
          />
          <FormInput
            name="password"
            label={t("modals.createUser.fields.password")}
            placeholder={t("modals.createUser.placeholders.password")}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export const useCreateUserModal = () => {
  const [visible, setVisible] = useState(false);

  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  const modal = visible ? <CreateUserModal onClose={hide} /> : null;

  return { show, modal };
};
