import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ISite } from "@/api/sites/types";

const schema = yup.object().shape({
  uuid: yup.string().required(),
  name: yup.string().required("Required field"),
  baseUrl: yup.string().url("validations.url").required("Required field"),
  reviewUrlTemplate: yup.string().url("validations.url").required("Required field"),
});

export const resolver = yupResolver(schema);

export const getDefaultValues = ({ uuid, name, baseUrl, reviewUrlTemplate }: ISite) => ({
  uuid,
  name,
  baseUrl,
  reviewUrlTemplate,
});
