import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { IUser } from "@/api/users/types";

const schema = yup.object().shape({
  uuid: yup.string().required(),
  firstName: yup.string().required("Required field"),
  lastName: yup.string().required("Required field"),
});

export const resolver = yupResolver(schema);

export const getDefaultValues = ({ uuid, firstName, lastName }: IUser) => ({
  uuid,
  firstName,
  lastName,
});
