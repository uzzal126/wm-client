import { objectSortByKey } from "@/helpers/misc";
import { GET_COMPONENTS, GET_STORE_INFO } from "@/helpers/services/api";
import { setDataByKey } from "@/redux-handler/reducers/storeDataReducer";
import { apiSlice } from "../apiSlice";

export const defaultApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // GET
    getStoreDetails: builder.query<any, undefined>({
      query: () => ({
        url: `${GET_STORE_INFO}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }) {
        try {
          const { data: results } = await queryFulfilled;
          if (results.data) {
            const theme_info = objectSortByKey(results?.data?.theme_info);

            dispatch(
              setDataByKey({
                key: "data",
                data: { ...results?.data, theme_info },
              })
            );
          }
        } catch (err) {}
      },
    }),
    getComponents: builder.query<any, undefined>({
      query: () => ({
        url: GET_COMPONENTS,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetComponentsQuery, useGetStoreDetailsQuery } = defaultApi;
