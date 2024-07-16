import { objectSortByKey } from "../../helpers/misc";
import { GET_STORE_INFO } from "../../helpers/services/api";
import { apiSlice } from "../api/apiSlice";
import { setDataByKey } from "./storeDataReducer";

export const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccess: builder.query({
      query: () => ({
        url: `${"auth/v2/get-access-token"}`,
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversation = await queryFulfilled;
        if (conversation?.data) {
          let access = {
            access_token: `${conversation?.data?.access_token}`,
            refresh_token: `${conversation?.data?.refresh_token}`,
          };
          dispatch(
            setDataByKey({
              key: "apiAccess",
              data: access,
            })
          );
        }
      },
    }),
    getComponentList: builder.query({
      query: () => `${"general/v2/component/list"}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversation = await queryFulfilled;
        if (conversation?.data.success) {
          const list = {};
          for (let i = 0; i < conversation.data.data?.length; i++) {
            const obj = conversation.data.data[i];
            list[obj?.slug?.toUpperCase()] = obj?.slug;
          }
          dispatch(
            setDataByKey({
              key: "sectionKey",
              data: list,
            })
          );
        }
      },
    }),
    getMenuList: builder.query({
      query: () => `${"general/v2/menu-list"}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversation = await queryFulfilled;
        if (conversation?.data.success) {
          const { data } = conversation?.data;
          dispatch(
            setDataByKey({
              key: "menu_list",
              data: data.filter((e) => e?.url_type == "category"),
            })
          );

          dispatch(
            setDataByKey({
              key: "menu_all",
              data: data,
            })
          );
        }
      },
    }),
    getThemeInfo: builder.query({
      query: () => GET_STORE_INFO,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const conversation = await queryFulfilled;
        if (conversation?.data.success) {
          const { data } = conversation?.data;
          const theme_info = objectSortByKey(data);
          dispatch(
            setDataByKey({
              key: "data",
              data: { ...theme_info },
            })
          );
        }
      },
    }),
  }),
});

export const {
  useGetAccessQuery,
  useGetComponentListQuery,
  useGetMenuListQuery,
  useGetThemeInfoQuery,
} = storeApi;
