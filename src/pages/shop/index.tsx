import { ShopResponse } from "@/components/shop/core/type";
import LeftSidebar from "@/components/shop/left_sidebar";
import Metro from "@/components/shop/metro";
import Minimal from "@/components/shop/minimal";
import NoSidebar from "@/components/shop/no_sidebar";
import SidebarPopup from "@/components/shop/sidebar_popup";
import { useFilter } from "@/contexts/filter/FilterProvider";
import { GET_ACCESS_TOKEN } from "@/helpers/services/api";
import { createAxios, queryRequest } from "@/helpers/services/request";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useAppDispatch, wrapper } from "@/store";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SeoHead from "../../components/layout/seo/head";
import RightSidebar from "../../components/shop/right_sidebar";
import Page404 from "../404";

const ShopPage = ({ data: shopRes }: any) => {
  const router = useRouter();
  const { slug } = router.query;
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;

  const dispatch = useAppDispatch();

  const [response, setResponse] = useState<ShopResponse>({
    category: {},
    data: [],
    payload: {},
    isLoading: true,
  });

  const { getSlug, apiSlug, queryParam } = useFilter();

  useEffect(() => {
    const { min_price, max_price } = router.query;
    if (!min_price || !max_price) {
      if (
        router.pathname.includes("/category") ||
        router.pathname.includes("/categories")
      ) {
        router.push(`/category/${getSlug}`);
      } else if (router.pathname.includes("/products")) {
        router.push(`/products/${getSlug}`);
      } else {
        router.push(`/shop/${getSlug}`);
      }
    }
    if (shopRes?.success) {
      // console.log('in else')
      if (shopRes?.success && shopRes?.status_code === 200) {
        // console.log(shopRes?.isLoading);
        setResponse({
          category: shopRes?.category_details_data,
          data: shopRes?.data,
          payload: shopRes?.payload,
          isLoading: shopRes?.isLoading ? true : false,
        });
      } else {
        setResponse({
          category: shopRes?.category_details_data,
          data: [],
          payload: {},
          isLoading: shopRes?.isLoading ? true : false,
        });
      }
    }
    getData();
  }, [getSlug, queryParam]);

  const getData = async () => {
    const { min_price, max_price } = router.query;
    if (min_price || max_price) {
      const res = await dispatch(
        productsApi.endpoints.getProductByCategory.initiate({
          params: `?${apiSlug}`,
        })
      );

      // if (shopRes.isSuccess) {
      //   if (shopRes.data.success && shopRes.data.status_code === 200) {
      //     setResponse({
      //       category: shopRes.data.category_details_data,
      //       data: res.data.data,
      //       payload: res.data.payload,
      //       isLoading: res.isLoading,
      //     });
      //   } else {
      //     setResponse({
      //       category: res.data.category_details_data,
      //       data: [],
      //       payload: {},
      //       isLoading: res.isLoading,
      //     });
      //   }
      // }
    }
  };

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`${
          shopRes?.data?.category_details_data &&
          shopRes?.data?.category_details_data?.title
            ? shopRes?.data?.category_details_data?.title
            : "Products"
        }`}
      />
      {data?.general_settings?.shop_page?.layout === "left_sidebar" ? (
        <LeftSidebar response={response} />
      ) : data?.general_settings?.shop_page?.layout === "right_sidebar" ? (
        <RightSidebar response={response} />
      ) : data?.general_settings?.shop_page?.layout === "no_sidebar" ? (
        <NoSidebar response={response} />
      ) : data?.general_settings?.shop_page?.layout === "full_shop" ? (
        <Metro response={response} />
      ) : data?.general_settings?.shop_page?.layout === "popup_shop" ? (
        <SidebarPopup response={response} />
      ) : data?.general_settings?.shop_page?.layout === "minimal_shop" ? (
        <Minimal response={response} />
      ) : (
        <LeftSidebar response={response} />
      )}
    </>
  );
};

export default ShopPage;

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
      // console.log(res?.data);

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
