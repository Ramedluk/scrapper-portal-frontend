import { ICompany } from "@/api/companies/types";
import { IReview } from "@/api/scraping/types";
import { ISite } from "@/api/sites/types";

export interface IDashboardSite {
  site: ISite;
  fullUrl: string;
  lastScrapingResult?: IReview;
}
export interface IDashboardCompanyItem extends ICompany {
  sites: IDashboardSite[];
}

export interface IDashboardSiteWithCompanyId extends IDashboardSite {
  companyId: string;
}
