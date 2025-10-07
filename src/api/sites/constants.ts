export const endpoints = {
  getSites: () => "/api/sites",
  getSite: (uuid: string) => `/api/sites/${uuid}`,
  updateSite: (uuid: string) => `/api/sites/${uuid}`,
};

export const SITES_KEYS = {
  SITES: "SITES",
};
