export const endpoints = {
  signUp: () => "/api/auth/register",
  signIn: () => "/api/auth/login",
  refreshToken: () => "/api/auth/refresh",
  logout: () => "/api/auth/logout",
};

export const AUTH_KEYS = {
  REFRESH: "REFRESH",
};

export const AUTH_CONFIG = {
  EXPIRATION_OFFSET: 30 * 1000, // the offset before the expiration of the token for the outcoming request
  TOKEN_CHECK_SLEEP: 200, // the interval to check if the token is refreshing
  RETRIES_LOGGED_IN: 2, // how many times the refresh request will retry if the user logged in
  RETRIES_LOGGED_OUT: 0, // how many times the refresh request will retry if the user logged out
};
