import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import type { NextPage } from "next";
import { useSelector } from "react-redux";

import BlogThemes from "@/components/blogs/blogThemes";
import AboutMeHandler from "@/components/handler/AboutMeHandler";
import FormBuilderHandler from "@/components/handler/FormBuilderHandler";
import GalleryHandler from "@/components/handler/GalleryHandler";
import HeroHandler from "@/components/handler/HeroHandler";
import TeamHandler from "@/components/handler/TeamHandler";
import { BASE_URL } from "@/config/constant/api.constant";
import { objectSortByKey } from "@/helpers/misc";
import { GET_ACCESS_TOKEN, GET_STORE_INFO } from "@/helpers/services/api";
import { useGetStoreDetailsQuery } from "@/redux-handler/api/slices/defaultSlice";
import store, { wrapper } from "@/store";
import axios from "axios";
import nookies from "nookies";
import { useEffect } from "react";
import AboutHandler from "../components/handler/AboutHandler";
import BannerHandler from "../components/handler/BannerHandler";
import BlogHandler from "../components/handler/BlogHandler";
import CampaignHandler from "../components/handler/CampaignHandler";
import CategoryHandler from "../components/handler/CategoryHandler";
import ComponentHandler from "../components/handler/ComponentHandler";
import ImageHandler from "../components/handler/ImageHanlder";
import ProductBoxHandler from "../components/handler/ProductBoxHandler";
import ServiceHandler from "../components/handler/ServiceHandler";
import SliderHandler from "../components/handler/SliderHandler";
import TagHandler from "../components/handler/TagHandler";
import TestimonialHandler from "../components/handler/TestimonialHandler";
import TextBlockHandler from "../components/handler/TextBlockHandler";
import VideoHandler from "../components/handler/VideoHandler";
import { setDataByKey } from "../redux-handler/reducers/storeDataReducer";

const IndexPage: NextPage = ({ result, storeSSRData }: any) => {
  useGetStoreDetailsQuery(undefined);
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  const sectionKey = storeData?.sectionKey;

  useEffect(() => {
    if (storeSSRData) {
      const theme_info = objectSortByKey(storeSSRData?.theme_info);
      const newData = { ...storeSSRData, theme_info };
      store.dispatch(
        setDataByKey({
          key: "data",
          data: newData,
        })
      );
    }
  }, []);

  return (
    <>
      {data?.store_info?.store_cat_id === 20 ? (
        <BlogThemes />
      ) : data?.theme_info && Object.keys(data?.theme_info).length > 0 ? (
        Object.keys(data?.theme_info).map((key, i) => {
          let parseKey: any = key.split("_");
          parseKey =
            parseKey.length > 0 && parseKey[0] !== "" ? parseKey[0] : "";

          if (
            parseKey === sectionKey?.CAMPAIGNS &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<CampaignHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.SLIDER &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<SliderHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.CATEGORY &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<CategoryHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.COLLECTIONBOX &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<ProductBoxHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.TAGS &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<TagHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.ABOUT &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<AboutHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.BANNER &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<BannerHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.VIDEO &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<VideoHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.BLOG &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<BlogHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.SERVICE &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<ServiceHandler />}
              />
            );
          } else if (
            parseKey === sectionKey?.TESTIMONIAL &&
            data?.theme_info[key]?.status
          ) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<TestimonialHandler />}
              />
            );
          } else if (parseKey === sectionKey?.IMAGE) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<ImageHandler />}
              />
            );
          } else if (parseKey === sectionKey?.TEXT) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<TextBlockHandler />}
              />
            );
          } else if (parseKey === sectionKey?.TEAM) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<TeamHandler />}
              />
            );
          } else if (parseKey === sectionKey?.HERO) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<HeroHandler />}
              />
            );
          } else if (parseKey === sectionKey?.ABOUTME) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<AboutMeHandler />}
              />
            );
          } else if (parseKey === sectionKey?.FORMBUILDER) {
            return (
              <ComponentHandler
                key={"pos-" + i}
                sectionData={data?.theme_info[key]}
                component={<FormBuilderHandler />}
              />
            );
          } else if (sectionKey?.hasOwnProperty("GALLERY-IMAGE")) {
            if (parseKey === sectionKey["GALLERY-IMAGE"]) {
              // console.log("im here");
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.theme_info[key]}
                  component={<GalleryHandler />}
                />
              );
            }
          }
        })
      ) : null}
    </>
  );
};

export default IndexPage;

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: any) => {
    // Parse
    const origin: any = context.req?.headers?.host;
    const cookies = nookies.get(context);
    let token = cookies?.token;

    if (!token) {
      const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers: {
          Origin: origin,
        },
      });
      // console.log('in not token')
      const { data: response } = await axiosInstance.post(GET_ACCESS_TOKEN);
      token = `Bearer ${response?.access_token}`;
      // console.log(response)
    }

    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        Origin: origin,
        Authorization: token,
      },
    });

    const storeInfo = await axiosInstance.get(GET_STORE_INFO); //await getQueryRequest(GET_STORE_INFO);
    // console.log(storeInfo?.data)

    if (storeInfo?.data?.success) {
      return { props: { storeSSRData: storeInfo?.data?.data } };
    } else {
      return { props: { storeSSRData: {} } };
    }
  }
);
