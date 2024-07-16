import { GET_CAMP_DATA, GET_CAMP_PRODS } from "@/config/constant/api.constant";
import {
  BRAND_LIST,
  GET_MENUS,
  GET_PRODUCT_DETAILS,
  GET_PRODUCT_LIST_BY_CATEGORY,
  GET_VARIANTS,
} from "@/helpers/services/api";
import { apiSlice } from "../apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    // GET
    getProductByCategory: builder.query<any, any>({
      query: ({ params }) => ({
        url: `${GET_PRODUCT_LIST_BY_CATEGORY}${params}`,
        method: "GET",
        // headers: { Authorization: token ? token : undefined , Origin: origin ? origin : undefined}
      }),
    }),
    getMoreProductByCategory: builder.query({
      query: ({ params }) => ({
        url: `${GET_PRODUCT_LIST_BY_CATEGORY}${params}`,
        method: "GET",
      }),
      async onQueryStarted(
        { params, searchParam },
        { queryFulfilled, dispatch }
      ) {
        try {
          const products = await queryFulfilled;
          // console.log('products', products)
          if (products?.data?.data?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getProductByCategory" as never,
                { params: searchParam } as never,
                (draft: any) => {
                  return {
                    ...draft,
                    data: [...draft?.data, ...products?.data?.data],
                  };
                }
              )
            );
            // update messages cache pessimistically end
          }
        } catch (err) {}
      },
    }),
    // GET
    getProductByCampaign: builder.query<any, string>({
      query: params => ({
        url: `${GET_CAMP_DATA}${params}`,
        method: "GET",
      }),
    }),
    getProductByCampaignSlug: builder.query<any, string>({
      query: params => ({
        url: `${GET_CAMP_PRODS}${params}`,
        method: "GET",
      }),
    }),
    getCategoryList: builder.query<any, undefined>({
      query: () => ({
        url: GET_MENUS,
        method: "GET",
      }),
    }),
    getBrands: builder.query<any, undefined>({
      query: () => ({
        url: BRAND_LIST,
        method: "GET",
      }),
    }),
    getVariants: builder.query<any, string>({
      query: params => ({
        url: `${GET_VARIANTS}?${params}`,
        method: "GET",
      }),
    }),
    getProduct: builder.query<any, any>({
      query: data => ({
        url: `${GET_PRODUCT_DETAILS}/${data?.slug}`,
        method: "GET",
        headers: { Authorization: data?.token, Origin: data?.origin },
      }),
    }),
  }),
});

export const {
  useGetProductByCategoryQuery,
  useGetCategoryListQuery,
  useGetBrandsQuery,
  useGetVariantsQuery,
  useGetProductQuery,
  useGetProductByCampaignQuery,
  useGetMoreProductByCategoryQuery,
  useGetProductByCampaignSlugQuery,
} = productsApi;
