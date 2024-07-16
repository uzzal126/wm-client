import { FC } from "react";
import Slider from "react-slick";
import { sliderConfig } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import ProductItem from "./product-box/ProductBox1";

type Props = {
  data: any;
  loading: any;
  cartClass: any;
  settings: any;
};

export const ProductSlider: FC<Props> = ({
  data,
  loading,
  cartClass,
  settings,
}) => {
  //console.log("settings", settings);
  return (
    <>
      {loading && (
        <div className="row mx-0 margin-default">
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
      )}
      {data && data?.length > 0 && (
        <Slider
          {...sliderConfig(settings?.slider, settings?.show, data.length)}
          className="product-4 product-m no-arrow"
        >
          {data &&
            data.map((product: any, index: number) => (
              <div key={index}>
                <ProductItem product={product} cartClass={cartClass} />
              </div>
            ))}
        </Slider>
      )}
      {data?.length <= 0 && !loading && (
        <div className="col-xs-12">
          <div className="col-sm-12 empty-cart-cls text-center">
            <img src={""} className="img-fluid mb-4 mx-auto" alt="" />
            <h3>
              <strong>No Products Found</strong>
            </h3>
            <h4>Explore more shortlist some items.</h4>
          </div>
        </div>
      )}
    </>
  );
};
