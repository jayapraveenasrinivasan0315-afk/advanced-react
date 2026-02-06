export const AuthProviders = {
  LOCAL: "LOCAL",
} as const;

export type AuthProvidersType =
  (typeof AuthProviders)[keyof typeof AuthProviders];

export const AuthMethod = {
  PHONE: "phone",
};
export type AuthMethodType = (typeof AuthMethod)[keyof typeof AuthMethod];

export const LOCAL_STORAGE_USER_KEY = "user";
