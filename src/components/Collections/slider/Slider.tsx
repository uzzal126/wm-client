import { FC, Fragment } from "react";
import Slider from "react-slick";
import MasterSlider from "./MasterSlider";

type Props = {
  data: any;
  sectionClass?: any;
};

const SliderComponent1: FC<Props> = ({ data, sectionClass }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: data?.setting?.arrow || true,
    autoplay: data?.setting?.autoplay || false,
    dots: data?.setting?.dots || false,
  };
  return (
    <Fragment>
      <section className="p-0">
        <Slider {...settings} className="slide-1 home-slider">
          {data &&
            data?.list.length > 0 &&
            data?.list.map((slider: any, i: any) => {
              return (
                <MasterSlider
                  key={i}
                  img={slider?.banner_url}
                  mImg={slider?.mobile_banner_url}
                  desc={slider?.subtitle}
                  title={slider?.title}
                  link={slider?.redirect_url || "#"}
                />
              );
            })}
        </Slider>
      </section>
    </Fragment>
  );
};

export default SliderComponent1;
