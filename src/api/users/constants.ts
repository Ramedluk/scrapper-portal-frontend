export const endpoints = {
  createUser: () => "/api/users",
  getUsers: () => "/api/users",
  updateUser: (uuid: string) => `/api/users/${uuid}`,
};

export const USERS_KEYS = {
  USERS: "USERS",
};
