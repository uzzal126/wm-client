import AboutMeHandler from "@/components/handler/AboutMeHandler";
import ContactFormHandler from "@/components/handler/ContactFormHandler";
import FormBuilderHandler from "@/components/handler/FormBuilderHandler";
import GalleryHandler from "@/components/handler/GalleryHandler";
import HeroHandler from "@/components/handler/HeroHandler";
import ImageHandler from "@/components/handler/ImageHanlder";
import TeamHandler from "@/components/handler/TeamHandler";
import SeoHead from "@/components/layout/seo/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import AboutHandler from "../../components/handler/AboutHandler";
import BannerHandler from "../../components/handler/BannerHandler";
import BlogHandler from "../../components/handler/BlogHandler";
import CampaignHandler from "../../components/handler/CampaignHandler";
import CategoryHandler from "../../components/handler/CategoryHandler";
import ComponentHandler from "../../components/handler/ComponentHandler";
import ProductBoxHandler from "../../components/handler/ProductBoxHandler";
import ServiceHandler from "../../components/handler/ServiceHandler";
import SliderHandler from "../../components/handler/SliderHandler";
import TagHandler from "../../components/handler/TagHandler";
import TestimonialHandler from "../../components/handler/TestimonialHandler";
import TextBlockHandler from "../../components/handler/TextBlockHandler";
import VideoHandler from "../../components/handler/VideoHandler";
import { objectSortByKey } from "../../helpers/misc";
import { PAGE_DETAILS } from "../../helpers/services/api";
import { queryRequest } from "../../helpers/services/request";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import Page404 from "../404";

const DynamicPage = () => {
  let storeData = useSelector(selectStoreData);
  const [data, setData] = useState<any>({});
  const sectionKey = storeData?.sectionKey;
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const menu = storeData?.menu_all;

  const router = useRouter();
  const rts = router;
  let dynam = rts.query.dynamicPage;
  let sub = rts.query.sub;

  // console.log('in dynamic page', dynam)

  const current_page = menu?.filter(
    (e: any) =>
      (e?.url.includes(dynam) || e?.url.includes(sub)) && e?.url_type == "page"
  )[0]?.pid; //gets page id

  useEffect(() => {
    if (current_page && menu?.length > 0) {
      getPageData(current_page);
    }
    if (!current_page && menu?.length > 0) {
      setErr(true);
      setLoading(false);
    }
  }, [current_page, router?.asPath, menu?.length, dynam]);

  const getPageData = async (current_page: string | number) => {
    setLoading(true);
    const res = await queryRequest(PAGE_DETAILS, { pid: current_page });
    setLoading(false);
    if (res?.success) {
      let dth = {
        ...res?.data?.data,
        body: objectSortByKey(res?.data?.data?.body),
      };
      setData(dth);
      setErr(false);
    } else if (!res?.success) {
      setErr(true);
    }
  };
  // console.log({data})

  if (loading)
    return (
      <div className="d-flex align-items-center flex-column">
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: 50, height: 50 }}
        />
      </div>
    );
  if (err) {
    return <Page404 />;
  }

  // console.log({data});

  return (
    <>
      <SeoHead
        title={data?.seo?.title}
        description={data?.seo?.description}
        keywords={data?.seo?.keywords}
        // url={`${data?.store_info?.domain}/product/${slug}`}
        // image={data?.thumbnail.src}
      />
      {data?.body && Object.keys(data?.body).length > 0
        ? Object.keys(data?.body).map((key, i) => {
            let parseKey: any = key.split("_");
            parseKey =
              parseKey.length > 0 && parseKey[0] !== "" ? parseKey[0] : "";

            if (parseKey === sectionKey?.SLIDER) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<SliderHandler />}
                />
              );
            } else if (parseKey === sectionKey?.COLLECTIONBOX) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<ProductBoxHandler />}
                />
              );
            } else if (parseKey === sectionKey?.BANNER) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<BannerHandler />}
                />
              );
            } else if (parseKey === sectionKey?.BLOG) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<BlogHandler />}
                />
              );
            } else if (parseKey === sectionKey?.CAMPAIGNS) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<CampaignHandler />}
                />
              );
            } else if (parseKey === sectionKey?.ABOUT) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<AboutHandler />}
                />
              );
            } else if (parseKey === sectionKey?.VIDEO) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<VideoHandler />}
                />
              );
            } else if (parseKey === sectionKey?.IMAGE) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<ImageHandler />}
                />
              );
            } else if (parseKey === sectionKey?.CATEGORY) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<CategoryHandler />}
                />
              );
            } else if (parseKey === sectionKey?.TAGS) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<TagHandler />}
                />
              );
            } else if (parseKey === sectionKey?.SERVICE) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<ServiceHandler />}
                />
              );
            } else if (parseKey === sectionKey?.TESTIMONIAL) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<TestimonialHandler />}
                />
              );
            } else if (parseKey === sectionKey?.TEXT) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<TextBlockHandler />}
                />
              );
            } else if (parseKey === sectionKey?.TEAM) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<TeamHandler />}
                />
              );
            } else if (parseKey === sectionKey?.HERO) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<HeroHandler />}
                />
              );
            } else if (parseKey === sectionKey?.ABOUTME) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<AboutMeHandler />}
                />
              );
            } else if (parseKey === sectionKey?.FORMBUILDER) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<FormBuilderHandler />}
                />
              );
            } else if (parseKey === sectionKey?.CONTACTFORM) {
              return (
                <ComponentHandler
                  key={"pos-" + i}
                  sectionData={data?.body[key]}
                  component={<ContactFormHandler />}
                />
              );
            } else if (sectionKey?.hasOwnProperty("GALLERY-IMAGE")) {
              if (parseKey === sectionKey["GALLERY-IMAGE"]) {
                // console.log("im here");
                return (
                  <ComponentHandler
                    key={"pos-" + i}
                    sectionData={data?.body[key]}
                    component={<GalleryHandler />}
                  />
                );
              }
            }
          })
        : null}
    </>
  );
};

export default DynamicPage;
