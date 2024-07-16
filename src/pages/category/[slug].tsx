import React from "react";
import ShopPage from "../shop";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { wrapper } from "@/store";
import { GET_ACCESS_TOKEN } from "@/helpers/services/api";
import { createAxios, queryRequest } from "@/helpers/services/request";
import nookies from "nookies";

const CategoryPage = () => {
  return <ShopPage />;
};

export default CategoryPage;


export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: any) => {
    const { min_price, max_price, page, items_per_page } = context?.query; //when api support is available
    // console.log(context?.query);

    // Parse
    const cookies = nookies.get(context);
    const origin: any = context.req?.headers?.host;
    createAxios(origin);
    let token = cookies?.token;
    if (!token) {
      const response = await queryRequest(GET_ACCESS_TOKEN, {});
      token = `Bearer ${response?.access_token}`;
    }

    if (min_price || max_price) {
      const res = await store.dispatch(
        productsApi.endpoints.getProductByCategory.initiate({
          params: `?page=${page}&items_per_page=${items_per_page}&max_price=${max_price}&min_price=${min_price}`,
          token: token,
          origin: origin,
        })
      );

      if (res.isSuccess) {
        if (res.data.success && res.data.status_code === 200) {
          return { props: { data: res?.data } };
        } else {
          return { props: { data: {} } };
        }
      }
    }
    return { props: { data: {} } };
  }
);
