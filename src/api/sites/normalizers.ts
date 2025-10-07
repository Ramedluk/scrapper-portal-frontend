import { TObject } from "@/api/types";

import { ISite } from "./types";

export function normalizeSite(data?: TObject): ISite {
  return {
    id: (data?._id as string) || "",
    uuid: (data?.uuid as string) || "",
    name: `${data?.name || ""}`,
    baseUrl: `${data?.baseUrl || ""}`,
    reviewUrlTemplate: `${data?.reviewUrlTemplate || ""}`,
    createdAt: (data?.createdAt as string) || "",
  };
}
