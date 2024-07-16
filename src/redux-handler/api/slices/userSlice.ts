import { GET_COMPONENTS } from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const defaultApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET

    userLogin: builder.mutation<any, undefined>({
      query: (data) => ({
        url: GET_COMPONENTS,
        method: "POST",
        data: data,
      }),
    }),
  }),
});

export const { useUserLoginMutation } = defaultApi;
