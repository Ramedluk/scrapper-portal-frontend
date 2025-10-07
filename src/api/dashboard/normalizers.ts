import { normalizeCompany } from "@/api/companies/normalizers";
import { normalizeReview } from "@/api/scraping/normalizers";
import { normalizeSite } from "@/api/sites/normalizers";
import { TObject } from "@/api/types";

import { IDashboardCompanyItem } from "./types";

export function normalizeDashboardItem(data?: TObject): IDashboardCompanyItem {
  return {
    ...normalizeCompany((data as TObject) || {}),
    sites: ((data?.sites as TObject[]) || []).map((item) => ({
      site: normalizeSite((item?.site as TObject) || {}),
      fullUrl: `${item.fullUrl || ""}`,
      lastScrapingResult: item.lastScrapingResult
        ? normalizeReview(item.lastScrapingResult as TObject)
        : undefined,
    })),
  };
}
