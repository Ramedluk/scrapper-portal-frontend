export const endpoints = {
  scrapeAll: () => "/api/scraping/scrape-all",
  scrapeBySite: (siteUuid: string) => `/api/scraping/site/${siteUuid}`,
  scrapeByCompany: (companyUuid: string) => `/api/scraping/company/${companyUuid}`,
  getScrapingHistory: () => "/api/scraping/history",
};

export const SCRAPING_KEYS = {
  SCRAPING_HISTORY: "scraping-history",
};
