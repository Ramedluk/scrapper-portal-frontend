import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ICompany } from "@/api/companies/types";

const schema = yup.object().shape({
  uuid: yup.string().required(),
  name: yup.string().required("Required field"),
});

export const resolver = yupResolver(schema);

export const getDefaultValues = ({ uuid, name }: ICompany) => ({
  uuid,
  name,
});
