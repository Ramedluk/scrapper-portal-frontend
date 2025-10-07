export interface IJwtData {
  sub?: string;
  role?: string;
  session?: string;
  iss?: string;
  uuid?: string;
  exp?: number;
  iat?: number;
}

export const readJWTData = <TData>(jwt: string): TData | undefined => {
  const encodedDataParts = jwt.split(".");
  if (encodedDataParts.length !== 3) {
    return undefined;
  }
  const encodedData = encodedDataParts[1];
  const decoded = window.atob(encodedData);
  return JSON.parse(decoded);
};

export const getTokenData = (token: string): IJwtData => readJWTData<IJwtData>(token) || {};
