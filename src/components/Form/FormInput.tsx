import React from "react";
import { useController, useFormContext } from "react-hook-form";

import { Form, Input } from "antd";
import { InputProps } from "antd/lib";

interface IFormInput extends InputProps {
  name: string;
  label?: string;
}

const FormInput = ({ name, label, ...rest }: IFormInput) => {
  const { control } = useFormContext();
  const {
    field: { value, ...field },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <Form.Item
      layout="vertical"
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error ? (error.message as string) : undefined}
    >
      <Input {...field} {...rest} value={value || ""} />
    </Form.Item>
  );
};

export default FormInput;
