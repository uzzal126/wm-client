import Link from "next/link";
import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { ImageHelper } from "../../helpers/lazy-load-image/image-lazy-load";
import {
  getProductURL,
  getThumbnail,
  linkHandler,
  sliderConfig,
} from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import {
  CardBtn,
  CompareBtn,
  QuickViewBtn,
  WishlistBtn,
} from "../widgets/product-box/includes/btns";
import {
  PriceParties,
  RatingMake,
} from "../widgets/product-box/includes/parties";
import { useQueryProducts } from "./hooks/useQueryProducts";

type ProType = {
  product: any;
};

const ProductBox: FC<ProType> = ({ product }) => {
  return (
    <>
      <div className="theme-card">
        <div className="offer-slider">
          <div className="mb-4">
            <div className="product-box2 product-box">
              <div className="media img-wrapper">
                <Link href={getProductURL(product)}>
                  <>
                    <div className="front">
                      <ImageHelper
                        src={getThumbnail(product)}
                        className="img-fluid blur-up lazyload"
                        alt=""
                      />
                    </div>
                    <div className="back">
                      <ImageHelper
                        src={
                          product.gallery && product.gallery.length > 0
                            ? product.gallery[0].src
                            : ""
                        }
                        className="img-fluid blur-up lazyload"
                        alt=""
                      />
                    </div>
                  </>
                </Link>
                <div className="media-body align-self-center">
                  <RatingMake size={16} total={product?.rating?.avg} />
                  <Link href={getProductURL(product)}>
                    <h6>{product?.name || product?.title}</h6>
                  </Link>
                  <PriceParties product={product} />
                  <div
                    className="cart-bottom"
                    style={{ background: "rgba(50, 50, 50, 0.9)" }}
                  >
                    <CardBtn product={product} />
                    <WishlistBtn product={product} />
                    <QuickViewBtn product={product} />
                    <CompareBtn product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

type Props = {
  data: any;
};

const ProductCollection11: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const settings = data?.setting;
  const allMenus = storeData.menu_all;
  const cat_list = Array.isArray(data) ? data?.filter(e => e?.id !== 0) : [];
  if (cat_list.length === 0) return <></>;
  let ids = cat_list.map(obj => JSON.stringify(obj.id)).join(",");
  const param = `/${ids}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  if (loading)
    return (
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
    );

  if (!products || products?.length === 0)
    return (
      <Col xs="12">
        <div>
          <div className="text-center col-sm-12 empty-cart-cls">
            <img
              src={`/static/images/empty-search.jpg`}
              className="mx-auto mb-4 img-fluid"
              alt=""
            />
            <h3>
              <strong>No Product Found!</strong>
            </h3>
            <h4>Explore more shortlist some items.</h4>
          </div>
        </div>
      </Col>
    );

  return (
    <Fragment>
      <section className="section-b-space box-product">
        <div className="full-box">
          <Container>
            <div className="title4">
              <h2 className="title-inner4">{data?.title}</h2>
              <div className="mb-3 line">
                <span></span>
              </div>
            </div>
            <div>
              {data?.setting?.layout_type === "slider" ? (
                <>
                  <Slider
                    {...sliderConfig(
                      data?.setting?.slider,
                      data?.setting?.show,
                      products.length
                    )}
                    className="product-4 product-m no-arrow"
                  >
                    {products &&
                      products.length > 0 &&
                      products.map((product: any, index: number) => (
                        <div key={index}>
                          <Col
                            key={index}
                            style={{
                              width:
                                products?.length < 4
                                  ? `${16.67 * products?.length}%`
                                  : "auto",
                            }}
                          >
                            <ProductBox product={product} />
                          </Col>
                        </div>
                      ))}
                  </Slider>
                  {hasMore && (
                    <div className="my-4">
                      <div style={{ textAlign: "center" }}>
                        <Link
                          href={linkHandler(
                            Array.isArray(data?.list) && data?.list?.length > 0
                              ? data?.list[0]
                              : 0,
                            allMenus
                          )}
                          className="rounded btn btn-sm btn-outline-primary"
                        >
                          More Products <i className="ml-2 fa fa-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Row
                    xl={data?.setting?.show?.desktop_row}
                    lg={data?.setting?.show?.tablet_row}
                    sm={data?.setting?.show?.mobile_row}
                  >
                    {products &&
                      products.length > 0 &&
                      products.map((product: any, index: number) => (
                        <Col key={index}>
                          <ProductBox product={product} />
                        </Col>
                      ))}
                  </Row>
                  {hasMore && (
                    <div className="my-4">
                      <div style={{ textAlign: "center" }}>
                        <Link
                          href={linkHandler(
                            Array.isArray(data?.list) && data?.list?.length > 0
                              ? data?.list[0]
                              : 0,
                            allMenus
                          )}
                          className="rounded btn btn-sm btn-outline-primary"
                        >
                          More Products <i className="ml-2 fa fa-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export { ProductCollection11 };
