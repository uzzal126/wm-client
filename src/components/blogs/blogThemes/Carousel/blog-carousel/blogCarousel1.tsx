import BlogMasterSlider from "@/components/Collections/slider/BlogMasterSlider";
import { Fragment } from "react";
import Slider from "react-slick";

const BlogCarousel1 = ({ data, posts }: { data: any; posts: any }) => {
  // console.log("img", data);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: data?.setting?.arrow || true,
    autoplay: data?.setting?.autoplay || true,
    dots: data?.setting?.dots || false,
  };
  return (
    <Fragment>
      <section className="p-0">
        <Slider {...settings} className="slide-1 home-slider">
          {posts && posts.length > 0 ? (
            posts.map((slider: any, i: any) => {
              return (
                <BlogMasterSlider
                  key={i}
                  img={
                    slider.banner?.src || "/images/sample-desktop-banner.png"
                  }
                  mImg={
                    slider.thumbnail?.src || "/images/sample-mobile-banner.png"
                  }
                  desc={""}
                  title={slider.title}
                  classes={""}
                  slug={slider?.slug}
                />
              );
            })
          ) : (
            <div className="p-4">No Post Found</div>
          )}
        </Slider>
      </section>
    </Fragment>
  );
};

export default BlogCarousel1;
