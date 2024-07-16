import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { linkHandler, sliderConfig } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox1";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
  title: any;
  subtitle: any;
  details: any;
  designClass: any;
  cartClass: any;
  innerClass: any;
  inner: any;
};

const SingleCollection: FC<Props> = ({
  data,
  settings,
  title,
  subtitle,
  details,
  designClass,
  cartClass,
  innerClass,
  inner,
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

  return (
    <section className={designClass}>
      <div className={innerClass + " title-gradient"}>
        {subtitle ? <h3>{subtitle}</h3> : ""}
        {title ? (
          <h2 className={`${inner} ${details ? " mb-2" : ""}`}>{title}</h2>
        ) : (
          ""
        )}
        <div className="line"></div>
        {details ? <p className="mb-4">{details}</p> : ""}
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
                  <Slider
                    {...sliderConfig(
                      settings?.slider,
                      settings?.show,
                      products.length
                    )}
                    className="product-m no-arrow"
                  >
                    {products &&
                      products.length > 0 &&
                      products.map((product: any, i: number) => (
                        <div key={i}>
                          <ProductItem
                            product={product}
                            cartClass={cartClass}
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
            {!products || products.length <= 0 || loading ? (
              <div className="row margin-default">
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
                    products.map((product: any, index: number) => (
                      <Col key={index}>
                        <div>
                          <ProductItem
                            product={product}
                            cartClass={cartClass}
                            key={index}
                          />
                        </div>
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
        </>
      )}
    </section>
  );
};

type ProType = {
  data: any;
  designClass: any;
  cartClass: any;
  innerClass: any;
  inner: any;
};

const ProductCollection3: FC<ProType> = ({
  data,
  designClass,
  cartClass,
  innerClass,
  inner,
}) => {
  return (
    <SingleCollection
      settings={data?.setting}
      data={data?.list}
      title={data?.title}
      subtitle={data?.subtitle}
      details={data?.details}
      designClass={designClass}
      cartClass={cartClass}
      inner={inner}
      innerClass={innerClass}
    />
  );
};

export { ProductCollection3 };
