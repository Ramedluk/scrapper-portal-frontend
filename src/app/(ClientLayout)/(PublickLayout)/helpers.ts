import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("Required field").email("Invalid email"),
  password: yup.string().required("Required field"),
});

export const resolver = yupResolver(schema);

export const DEFAULT_VALUES = { email: "", password: "" };
