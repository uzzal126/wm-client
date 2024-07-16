import ProductNotFound from "@/components/error_handler/productNotFound";
import SeoHead from "@/components/layout/seo/head";
import ThreeColBottom from "@/components/product/3_col_bottom";
import ThreeColLeft from "@/components/product/3_col_left";
import ThreeColRight from "@/components/product/3_col_right";
import FourImage from "@/components/product/4_image";
import Accordion from "@/components/product/accordian";
import ProductLayout10 from "@/components/product/layout10";
import LeftSidebar from "@/components/product/let_sidebar";
import Minimal from "@/components/product/minimal";
import NoSidebar from "@/components/product/no-sidebar";
import RightSidebar from "@/components/product/right_sidebar";
import { BASE_URL } from "@/config/constant/api.constant";
import PostLoader from "@/helpers/preloader/PostLoader";
import { GET_ACCESS_TOKEN } from "@/helpers/services/api";
import { createAxios } from "@/helpers/services/request";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { wrapper } from "@/store";
import axios from "axios";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useSelector } from "react-redux";

const ProductDetails = ({ data: productsData }: any) => {
  const router = useRouter();
  const { slug } = router.query;

  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  const layout = data?.general_settings?.product_page?.layout;

  const pdDetails = productsData?.data;

  if (!pdDetails || Object.keys(pdDetails)?.length === 0)
    return (
      <>
        <ProductNotFound />
      </>
    );

  if (!pdDetails) {
    return (
      <>
        <div className="mx-0 row margin-default">
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
          <div className="col-xl-3 col-lg-4 col-6">
            <PostLoader />
          </div>
        </div>
      </>
    );
  }

  // console.log(pdDetails?.seo?.description || pdDetails?.name);

  return (
    pdDetails && (
      <>
        <SeoHead
          title={pdDetails?.name}
          description={pdDetails?.seo?.description || pdDetails?.name}
          keywords={pdDetails?.seo?.keywords}
          url={`${data?.store_info?.domain}/product/${slug}`}
          image={pdDetails?.thumbnail?.src}
        />
        {layout === "left_sidebar" || layout === "style-1" ? (
          <LeftSidebar data={pdDetails} />
        ) : layout === "right_sidebar" ? (
          <RightSidebar data={pdDetails} />
        ) : layout === "no_sidebar" ? (
          <NoSidebar data={pdDetails} />
        ) : layout === "thee_col_bottom" ? (
          <ThreeColBottom data={pdDetails} />
        ) : layout === "thee_col_left" ? (
          <ThreeColLeft data={pdDetails} />
        ) : layout === "thee_col_right" ? (
          <ThreeColRight data={pdDetails} />
        ) : layout === "four_image" ? (
          <FourImage data={pdDetails} />
        ) : layout === "accordian" ? (
          <Accordion data={pdDetails} />
        ) : layout === "minimal_product" ? (
          <Minimal data={pdDetails} />
        ) : layout === "product_request" ? (
          <ProductLayout10 data={pdDetails} />
        ) : (
          <RightSidebar data={pdDetails} />
        )}
      </>
    )
  );
};

export default ProductDetails;

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: any) => {
    const { slug } = context?.query;

    // Parse
    const cookies = nookies.get(context);
    const origin: any = context.req?.headers?.host;
    createAxios(origin);
    let token = cookies?.token;
    if (!token) {
      const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
          Origin: origin,
        },
      });

      const { data: response } = await axiosInstance.post(GET_ACCESS_TOKEN);
      token = `Bearer ${response?.access_token}`;
    }

    try {
      const response = await store.dispatch(
        productsApi.endpoints.getProduct.initiate({
          slug: slug, //15704bbe-2776-4f9b-b0e1-40fee8086c3b`,
          token: token,
          origin: context?.req?.headers?.host,
        })
      );
      if (response?.data?.success) {
        return { props: { data: response?.data } };
      } else {
        console.log(`PDP error slug: ${slug}`);
        return { props: { data: {} } };
      }
    } catch (error) {
      console.log(`PDP error slug: ${slug}`);
      return { props: { data: {} } };
    }
  }
);
