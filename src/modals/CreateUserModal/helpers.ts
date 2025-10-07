import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("Required field"),
  lastName: yup.string().required("Required field"),
  email: yup.string().required("Required field").email("Invalid email"),
  password: yup.string().required("Required field").min(6, "Weak password"),
});

export const resolver = yupResolver(schema);

export const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
