import { TObject } from "@/api/types";

import { ICompany } from "./types";

export function normalizeCompany(data?: TObject): ICompany {
  return {
    id: (data?._id as string) || "",
    uuid: (data?.uuid as string) || "",
    name: `${data?.name || ""}`,
    createdAt: (data?.createdAt as string) || "",
  };
}
