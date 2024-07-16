import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { linkHandler, sliderConfig } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductBox4 from "../widgets/product-box/ProductBox4";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
  title: any;
  subtitle: any;
  designClass: any;
  cartClass: any;
  titleClass: any;
  inner: any;
};

const SingleComponent: FC<Props> = ({
  data,
  settings,
  title,
  subtitle,
  designClass,
  cartClass,
  titleClass,
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
      <Container>
        <div className={`mb-5 ${titleClass || ""}`}>
          {subtitle ? <h4>{subtitle}</h4> : ""}
          <h2 className={inner}>{title}</h2>
          <div className="mb-2 line">
            <span></span>
          </div>
        </div>
      </Container>
      {settings?.layout_type === "slider" ? (
        <Container>
          <Row>
            <Col>
              {!products || products.length === 0 || loading ? (
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
                    className="product-4 product-m no-arrow"
                  >
                    {products &&
                      products.length > 0 &&
                      products.map((product, index) => (
                        <div key={index}>
                          <ProductBox4
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
      ) : !products || products.length === 0 || loading ? (
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
          <Container>
            <Row
              className={`row-cols-${Number(settings?.show?.mobile_row)}`}
              xl={Number(settings?.show?.desktop_row)}
              lg={Number(settings?.show?.tablet_row)}
            >
              {products &&
                products.length > 0 &&
                products.map((product, index) => (
                  <Col key={index}>
                    <div>
                      <ProductBox4 product={product} key={index} />
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
  titleClass: any;
  inner: any;
};

const ProductCollection4: FC<ProType> = ({
  data,
  designClass,
  cartClass,
  titleClass,
  inner,
}) => {
  return (
    <SingleComponent
      settings={data?.setting}
      data={data?.list}
      title={data?.title}
      subtitle={data?.subtitle}
      designClass={designClass}
      cartClass={cartClass}
      inner={inner}
      titleClass={titleClass}
    />
  );
};

export { ProductCollection4 };
