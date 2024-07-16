import { BASE_URL } from "@/config/constant/api.constant";
import { queryRequest } from "@/helpers/services/request";
import { setDataByKey } from "@/redux-handler/reducers/storeDataReducer";
import store from "@/store";
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { GET_ACCESS_TOKEN } from "../../helpers/services/api";

type BaseQueryArgs = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
};

const fetchNewToken = async (): Promise<string> => {
  const response = await fetch(GET_ACCESS_TOKEN, {
    method: "POST",
    // Add any necessary headers
    headers: {
      Origin: "",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.access_token; // Replace "token" with the actual property in your API response
};

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, params }) => {
    try {
      let token =
        typeof window !== "undefined"
          ? localStorage.getItem("auth_token")
          : null;
      if (!token) {
        token = await fetchNewToken();
        if (typeof window !== "undefined") {
          localStorage.setItem("auth_token", token);
        }
      }

      const result = await axios({
        url: url,
        method,
        data,
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      // //console.log("exio, err", err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const state: any = getState();
      const token = state.store?.apiAccess?.access_token;
      if (token) {
        headers.set("Authorization", token);
      } else {
        const response = await queryRequest(GET_ACCESS_TOKEN, {});
        let access = {
          access_token: `Bearer ${response?.access_token}`,
          refresh_token: `${response?.refresh_token}`,
        };
        store.dispatch(
          setDataByKey({
            key: "apiAccess",
            data: access,
          })
        );
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    //console.log("action.type", action.type);
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["blogComments"],
  endpoints: () => ({}),
});
