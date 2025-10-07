export const endpoints = {
  createCompany: () => "/api/companies",
  getCompanies: () => "/api/companies",
  getCompany: (uuid: string) => `/api/companies/${uuid}`,
  updateCompany: (uuid: string) => `/api/companies/${uuid}`,
  deleteCompany: (uuid: string) => `/api/companies/${uuid}`,
};

export const COMPANIES_KEYS = {
  COMPANIES: "COMPANIES",
};
