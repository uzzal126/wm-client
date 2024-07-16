import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { linkHandler, sliderConfig } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox12";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
  title: any;
  subtitle: any;
  details: any;
  designClass: any;
  spanClass: any;
};

const SingleCollection: FC<Props> = ({
  data,
  settings,
  title,
  subtitle,
  details,
  designClass,
  spanClass,
}) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  const cat_list = Array.isArray(data) ? data?.filter(e => e?.id !== 0) : [];
  if (cat_list.length === 0) return <></>;
  let ids = cat_list.map(obj => JSON.stringify(obj.id)).join(",");
  const param = `/${ids}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  if ((!products || products?.length == 0) && !loading)
    return (
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
    );

  return (
    <section className={designClass}>
      <div className="title3">
        {subtitle ? <h4>{subtitle}</h4> : ""}
        {title ? <h2 className={`title-inner3`}>{title}</h2> : ""}
        <div className={`line ${details ? " mb-3" : ""}`}></div>
        {details ? <p className="mb-4">{details}</p> : ""}
        <hr role="tournament6" />
      </div>
      {settings?.layout_type === "slider" ? (
        <Container>
          <Row>
            <Col>
              {loading ? (
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
              ) : (
                <>
                  {/** change here */}
                  <Slider
                    {...sliderConfig(
                      settings?.slider,
                      settings?.show,
                      products.length
                    )}
                    className="product-5 product-m no-arrow"
                  >
                    {products &&
                      products.length > 0 &&
                      products.map((product, index) => (
                        <div key={index}>
                          <ProductItem
                            product={product}
                            spanClass={spanClass}
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
        </Container>
      ) : (
        <>
          <Container>
            <div>
              {loading ? (
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
              ) : (
                <>
                  <Row
                    className={`margin-default row-cols-${Number(
                      settings?.show?.mobile_row
                    )}`}
                    xl={Number(settings?.show?.desktop_row)}
                    lg={Number(settings?.show?.tablet_row)}
                  >
                    {products &&
                      products.length > 0 &&
                      products.map((product, index) => (
                        <Col key={index}>
                          <ProductItem
                            product={product}
                            spanClass={spanClass}
                            key={index}
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
            </div>
          </Container>
        </>
      )}
    </section>
  );
};

type ProType = {
  data: any;
  designClass: any;
  spanClass: any;
};

const ProductCollection2: FC<ProType> = ({ data, designClass, spanClass }) => {
  return (
    <SingleCollection
      settings={data?.setting}
      data={data?.list}
      title={data?.title}
      subtitle={data?.subtitle}
      details={data?.details}
      designClass={designClass}
      spanClass={spanClass}
    />
  );
};

export { ProductCollection2 };
