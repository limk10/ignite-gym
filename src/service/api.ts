import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
import { AppError } from "@utils/AppError";
import axios, { AxiosError, AxiosInstance } from "axios";

type PromisseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

let failedQueue: Array<PromisseType> = [];
let isRefreshing = false;

const API = axios.create({
  baseURL: "http://192.168.18.135:3333",
}) as APIInstanceProps;

API.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = API.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data?.message === "token.expired" ||
          requestError.response.data?.message === "token.invalid"
        ) {
          const { refresh_token } = await storageAuthTokenGet();
          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    ...originalRequestConfig.headers,
                    Authorization: `Bearer ${token}`,
                  };

                  resolve(API(originalRequestConfig));
                },
                onFailure: (axios: AxiosError) => {
                  reject(axios);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await API.post("/sessions/refresh-token", {
                refresh_token,
              });

              storageAuthTokenSave({
                token: data.token,
                refresh_token: data.refresh_token,
              });

              if (
                originalRequestConfig?.data &&
                !(originalRequestConfig.data instanceof FormData)
              ) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                ...originalRequestConfig.headers,
                Authorization: `Bearer ${data.token}`,
              };

              API.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              failedQueue.forEach((request) => {
                request.onSuccess(data.token);
              });

              resolve(API(originalRequestConfig));
            } catch (error: any) {
              failedQueue.forEach((request) => {
                request.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError?.response?.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      }

      return Promise.reject(requestError);
    }
  );

  return () => {
    API.interceptors.response.eject(interceptTokenManager);
  };
};

export { API };
