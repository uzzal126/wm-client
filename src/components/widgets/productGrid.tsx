import { FC } from "react";
import { Row } from "reactstrap";
import PostLoader from "../../helpers/preloader/PostLoader";
import ProductItem from "./product-box/ProductBox1";

type Props = {
  data: any;
  settings: any;
  loading: any;
  cartClass: any;
};

export const ProductGrid: FC<Props> = ({
  data,
  loading,
  cartClass,
  settings,
}) => {
  // console.log({ data, loading });
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
        <Row
          className={`margin-default row-cols-${Number(
            settings?.show?.mobile_row
          )}`}
          xl={Number(settings?.show?.desktop_row)}
          lg={Number(settings?.show?.tablet_row)}
        >
          {data.map((product: any, i: number) => (
            <ProductItem
              key={i}
              product={product}
              cartClass={cartClass}
              productClass={"col px-2"}
            />
          ))}
        </Row>
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
