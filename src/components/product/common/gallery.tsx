import { FC } from "react";
import Slider from "react-slick";
import { Media } from "reactstrap";
import ImageZoom from "./image-zoom";

type GalleryProps = {
  rootRef: any;
  images: any;
  navRef: any;
  className?: any;
  config?: any;
};

export const ImageGallery: FC<GalleryProps> = ({
  rootRef,
  images,
  navRef,
  className,
  config,
}) => {
  //console.log("ref", rootRef);
  return (
    <Slider
      {...config}
      slidesToShow={1}
      slidesToScroll={1}
      dots={false}
      arrows={true}
      fade={true}
      asNavFor={navRef}
      ref={slider => (rootRef.current = slider)}
      className={className || "product-slick"}
    >
      {images?.map((variant: any, index: number) => (
        <div key={index}>
          <ImageZoom image={variant?.thumbnail || images?.thumbnail?.src} />
        </div>
      ))}
    </Slider>
  );
};

export const GalleryNavigator: FC<GalleryProps> = ({
  images,
  navRef,
  rootRef,
  className,
  config,
}) => {
  var settings = {
    slidesToShow:
      images?.length > 3 ? 3 : images?.slice(1, images?.length)?.length,
    slidesToScroll: 1,
    swipeToSlide: true,
    infinity: images?.length > 3,
    arrows: false,
    dots: false,
    focusOnSelect: false,
    centerMode: false,
    ...config,
  };

  return (
    <Slider
      className={`${className || "slider-nav"}`}
      {...settings}
      asNavFor={navRef}
      ref={slider => (rootRef.current = slider)} // it will scroll to gallery automatically
    >
      {images && images.length > 0
        ? images
            ?.slice(1, images?.length)
            ?.map((variant: any, index: number) => (
              <div key={index}>
                <Media
                  src={`${variant?.thumbnail || images?.thumbnail?.src}`}
                  key={index}
                  alt={variant?.thumbnail || images?.thumbnail?.src}
                  className="img-fluid"
                />
              </div>
            ))
        : ""}
    </Slider>
  );
};
