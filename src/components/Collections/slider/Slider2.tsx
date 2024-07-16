import { styleGenerator } from "@/helpers/misc";
import { Fragment } from "react";
import Slider from "react-slick";
import GalleryMasterSlider from "./GalleryMasterSlider";

const SliderComponent2 = ({ data }: any) => {
  return (
    <Fragment>
      <section
        style={{
          ...styleGenerator(data?.setting?.styles),
        }}
      >
        {
          <div
            className={`${
              data?.mobile_fluid_view === true ? "fluid-view-desktop-class" : ""
            }`}
          >
            <Slider
              autoplay={data?.setting?.slider?.autoplay || false}
              dots={data?.setting?.slider?.dots || false}
              arrows={data?.setting?.slider?.arrow || false}
              className="slide-1 home-slider"
            >
              {data &&
                data?.list &&
                data?.list.length > 0 &&
                data?.list.map((slider: any, i: any) => {
                  return (
                    <GalleryMasterSlider
                      key={i}
                      img={slider.image}
                      link={slider.link}
                      item={slider}
                    />
                  );
                })}
            </Slider>
          </div>
        }
        {data &&
          data?.mobile_fluid_view &&
          data?.mobile_list &&
          data?.mobile_list.length > 0 && (
            <Slider
              autoplay={data?.setting?.slider?.autoplay || false}
              dots={data?.setting?.slider?.dots || false}
              arrows={data?.setting?.slider?.arrow || false}
              className="slide-1 home-slider mobile-fluid-view"
            >
              {data &&
                data?.mobile_fluid_view &&
                data?.mobile_list &&
                data?.mobile_list.length > 0 &&
                data?.mobile_list.map((slider: any, i: any) => {
                  return (
                    <GalleryMasterSlider
                      key={i}
                      img={slider.image}
                      link={slider.link}
                      item={slider}
                      mobile_fluid_view={data?.mobile_fluid_view}
                    />
                  );
                })}
            </Slider>
          )}
      </section>
    </Fragment>
  );
};

export default SliderComponent2;
