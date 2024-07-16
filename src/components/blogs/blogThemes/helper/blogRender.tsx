import AboutHandler from "@/components/handler/AboutHandler";
import AboutMeHandler from "@/components/handler/AboutMeHandler";
import BannerHandler from "@/components/handler/BannerHandler";
import BlogHandler from "@/components/handler/BlogHandler";
import CampaignHandler from "@/components/handler/CampaignHandler";
import CategoryHandler from "@/components/handler/CategoryHandler";
import ComponentHandler from "@/components/handler/ComponentHandler";
import FormBuilderHandler from "@/components/handler/FormBuilderHandler";
import GalleryHandler from "@/components/handler/GalleryHandler";
import HeroHandler from "@/components/handler/HeroHandler";
import ImageHandler from "@/components/handler/ImageHanlder";
import ProductBoxHandler from "@/components/handler/ProductBoxHandler";
import ServiceHandler from "@/components/handler/ServiceHandler";
import SliderHandler from "@/components/handler/SliderHandler";
import TagHandler from "@/components/handler/TagHandler";
import TeamHandler from "@/components/handler/TeamHandler";
import TestimonialHandler from "@/components/handler/TestimonialHandler";
import TextBlockHandler from "@/components/handler/TextBlockHandler";
import VideoHandler from "@/components/handler/VideoHandler";
import { objectSortByKey } from "@/helpers/misc";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSelector } from "react-redux";
import BlogCarouselHandler from "../Carousel/BlogCarouselHandler";

const BlogRender = ({ data }: any) => {
  let storeData = useSelector(selectStoreData);
  const sections = storeData?.sectionKey;

  const lists: any = objectSortByKey(data?.list);
  return (
    <div>
      <>
        {lists && Object.keys(lists).length > 0
          ? Object.keys(lists).map((key, i) => {
              let parseKeyArray = key.split("_");
              let parseKey =
                parseKeyArray.length > 0 && parseKeyArray[0] !== ""
                  ? parseKeyArray[0]
                  : "";

              if (parseKey === sections?.CAMPAIGNS) {
                return <CampaignHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.SLIDER) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<SliderHandler />}
                  />
                );
                // return <SliderHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.ABOUT) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<AboutHandler />}
                  />
                );
                // return <AboutHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.CATEGORY) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<CategoryHandler />}
                  />
                );
                // return <CategoryHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.BANNER) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<BannerHandler />}
                  />
                );
                // return <BannerHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.COLLECTIONBOX) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<ProductBoxHandler />}
                  />
                );
                // return <ProductBoxHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.TAGS) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<TagHandler />}
                  />
                );
                // return <TagHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.BLOG) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<BlogHandler />}
                  />
                );
                // return <BlogHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.TESTIMONIAL) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<TestimonialHandler />}
                  />
                );
                // return <TestimonialHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.VIDEO) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<VideoHandler />}
                  />
                );
                // return <VideoHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.SERVICE) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<ServiceHandler />}
                  />
                );
                // return <ServiceHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.IMAGE) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<ImageHandler />}
                  />
                );
                // return <ImageHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.TEXT) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<TextBlockHandler />}
                  />
                );
                // return <TextBlockHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.TEAM) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<TeamHandler />}
                  />
                );
                // return <TeamHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.HERO) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<HeroHandler />}
                  />
                );
                // return <HeroHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.FORMBUILDER) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<FormBuilderHandler />}
                  />
                );
                // return <FormBuilderHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.ABOUTME) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<AboutMeHandler />}
                  />
                );
                // return <AboutMeHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey.includes("gallery-image")) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<GalleryHandler />}
                  />
                );
                // return <GalleryHandler data={lists[key]} key={parseKey} />;
              } else if (parseKey === sections?.BLOGCAROUSEL) {
                return (
                  <ComponentHandler
                    key={parseKey}
                    sectionData={lists[key]}
                    component={<BlogCarouselHandler />}
                  />
                );
                // return <BlogCarouselHandler data={lists[key]} key={parseKey} />;
              }
            })
          : null}
      </>
    </div>
  );
};

export default BlogRender;
