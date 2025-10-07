import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Required field"),
});

export const resolver = yupResolver(schema);

export const DEFAULT_VALUES = {
  name: "",
};
