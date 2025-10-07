import { TObject } from "@/api/types";

import { IUser } from "./types";

export function normalizeUser(data?: TObject): IUser {
  return {
    uuid: (data?.uuid as string) || "",
    email: (data?.email as string) || "",
    firstName: (data?.firstName as string) || "",
    lastName: (data?.lastName as string) || "",
    fullName: `${data?.firstName || ""} ${data?.lastName || ""}`.trim(),
    createdAt: (data?.createdAt as string) || "",
  };
}
