"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Button, Card, Flex, Layout, Row, Typography } from "antd";

import { useSignIn } from "@/api/auth/queries";
import { ISignInPayload } from "@/api/auth/types";
import FormInput from "@/components/Form/FormInput";

import { DEFAULT_VALUES as defaultValues, resolver } from "./helpers";

const { Content } = Layout;
const { Title } = Typography;

const LoginPage = () => {
  const t = useTranslations();
  const { mutateAsync: signIn } = useSignIn();

  const methods = useForm({ resolver, defaultValues });
  const { handleSubmit, formState } = methods;
  const { isValid, isSubmitting } = formState;

  const handleSubmitForm = React.useCallback(async (values: ISignInPayload) => {
    await signIn(values);
  }, []);

  return (
    <Layout>
      <Content>
        <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
          <Card
            title={
              <Flex align="center" justify="center" gap={8} style={{ marginBottom: 12 }}>
                <Image src="/logo.svg" alt="Logo" width={48} height={48} />
                <Title level={3} style={{ margin: 0 }}>
                  {t("appTitle")}
                </Title>
              </Flex>
            }
            variant="outlined"
            styles={{ header: { padding: "12px 24px 0" } }}
          >
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleSubmitForm)}>
                <FormInput
                  name="email"
                  label={t("signIn.fields.email")}
                  placeholder={t("signIn.placeholders.email")}
                />
                <FormInput
                  type="password"
                  name="password"
                  label={t("signIn.fields.password")}
                  placeholder={t("signIn.placeholders.password")}
                />
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
                >
                  {t("signIn.actions.signIn")}
                </Button>
              </form>
            </FormProvider>
          </Card>
        </Row>
      </Content>
    </Layout>
  );
};

export default LoginPage;
