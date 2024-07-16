import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { linkHandler, sliderConfig } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox1";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
  title: string;
  subtitle: string;
  designClass: string;
  line: boolean;
  cartClass: string;
  productDetail: any;
  innerTitle: string;
};

const SingleComponent: FC<Props> = ({
  data,
  settings,
  title,
  subtitle,
  designClass,
  line,
  cartClass,
  productDetail,
  innerTitle,
}) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  const cat_list = Array.isArray(data) ? data?.filter(e => e?.id !== 0) : [];
  if (cat_list.length === 0) {
    return <p>Empty Cat List</p>;
  }
  let ids = cat_list.map(obj => JSON.stringify(obj.id)).join(",");
  const param = `/${ids}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  return (
    <section className={designClass}>
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <div className={"title3 text-left"}>
            {subtitle ? <h4>{subtitle}</h4> : ""}
            <h2 className={innerTitle}>{title}</h2>
            {line ? (
              <div style={{ width: 90 }}>
                <div className="line"></div>
              </div>
            ) : (
              ""
            )}
          </div>
          {hasMore && (
            <div>
              <Link
                href={"/category"}
                className="rounded btn btn-sm btn-outline-primary"
              >
                More Products <i className="ml-2 fa fa-arrow-right" />
              </Link>
            </div>
          )}
        </div>
        {settings?.layout_type === "slider" ? (
          <Row>
            <Col>
              {loading ? (
                products && products.length === 0 && !loading ? (
                  <Col xs="12">
                    <div>
                      <div className="text-center col-sm-12 empty-cart-cls">
                        <Media
                          src={""}
                          className="mx-auto mb-4 img-fluid"
                          alt=""
                        />
                        <h3>
                          <strong>No Products Found!</strong>
                        </h3>
                        <h4>Explore more shortlist some items.</h4>
                      </div>
                    </div>
                  </Col>
                ) : (
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
                )
              ) : (
                <>
                  <Slider
                    {...sliderConfig(
                      settings?.slider,
                      settings?.show,
                      products.length
                    )}
                    className="product-4 product-m no-arrow"
                  >
                    {products &&
                      products.length > 0 &&
                      products.map((product, index) => (
                        <div key={index}>
                          <ProductItem
                            product={product}
                            productDetail={productDetail}
                            key={index}
                            cartClass={cartClass}
                            productClass="pb-0 h-100"
                          />
                        </div>
                      ))}
                  </Slider>
                  {hasMore && (
                    <div className="my-4">
                      <div style={{ textAlign: "center" }}>
                        <Link
                          href={linkHandler(
                            Array.isArray(data) && data.length > 0
                              ? data[0]
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
            </Col>
          </Row>
        ) : loading ? (
          products && products.length === 0 && !loading ? (
            <Col xs="12">
              <div>
                <div className="text-center col-sm-12 empty-cart-cls">
                  <Media src={""} className="mx-auto mb-4 img-fluid" alt="" />
                  <h3>
                    <strong>No Products Found!</strong>
                  </h3>
                  <h4>Explore more shortlist some items.</h4>
                </div>
              </div>
            </Col>
          ) : (
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
          )
        ) : (
          <>
            <Row
              xl={Number(settings?.show?.desktop_row)}
              lg={Number(settings?.show?.tablet_row)}
              sm={Number(settings?.show?.mobile_row)}
            >
              {products &&
                products.length > 0 &&
                products.map((product, index) => (
                  <Col key={index} className="mb-3">
                    <ProductItem
                      product={product}
                      productDetail={productDetail}
                      key={index}
                      cartClass={cartClass}
                      productClass="pb-0 h-100"
                    />
                  </Col>
                ))}
            </Row>
            {hasMore && (
              <div className="my-4">
                <div style={{ textAlign: "center" }}>
                  <Link
                    href={linkHandler(
                      Array.isArray(data) && data.length > 0 ? data[0] : 0,
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
      </Container>
    </section>
  );
};

type ProType = {
  data: any;
  designClass: string;
  line: boolean;
  cartClass: string;
  productDetail?: string;
  innerTitle?: string;
};

const ProductCollection1: FC<ProType> = ({
  data,
  designClass,
  line,
  cartClass,
  productDetail,
  innerTitle,
}) => {
  return (
    <SingleComponent
      settings={data?.setting}
      data={data?.list}
      title={data?.title}
      subtitle={data?.subtitle}
      designClass={designClass}
      line={line}
      cartClass={cartClass}
      productDetail={productDetail}
      innerTitle={innerTitle || ""}
    />
  );
};

export { ProductCollection1 };
