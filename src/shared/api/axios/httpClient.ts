import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
import axios from "axios";

import { API_URL } from "@/shared/config";

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const httpClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

const logError = (context: string, error: unknown) => {
  if (import.meta.env.DEV) {
    console.log(`HTTP CLIENT ${context}:`, error);
  }
};

httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error?.response?.status;
    const originalConfig = error?.config as
      | ExtendedAxiosRequestConfig
      | undefined;

    logError("response interceptor", {
      status,
      url: originalConfig?.url,
      method: originalConfig?.method,
      message: error.message,
    });

    if (!originalConfig) {
      return Promise.reject(error);
    }

    if (status === 401 && authFailureHandler) {
      try {
        authFailureHandler(error);
      } catch (handlerError) {
        logError("auth failure handler error", handlerError);
      }
    }

    return Promise.reject(error);
  }
);

type AuthFailureHandler = (error?: AxiosError) => void;

let authFailureHandler: AuthFailureHandler | null = null;

export const setAuthFailureHandler = (handler: AuthFailureHandler) => {
  authFailureHandler = handler;
};

export const isRefreshError = (_error: unknown): _error is never => {
  return false;
};
