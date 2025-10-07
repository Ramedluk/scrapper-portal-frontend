import { TObject } from "@/api/types";

import { IAuth } from "./types";

export function normalizeAuth(data?: TObject): IAuth {
  return {
    accessToken: `${data?.accessToken || ""}`,
  };
}
