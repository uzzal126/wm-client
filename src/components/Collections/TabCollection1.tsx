import Link from "next/link";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { linkHandler, sliderConfig, styleGenerator } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox1";
import { useQueryProducts } from "./hooks/useQueryProducts";

const emptySearch = "/assets/images/empty-search.jpg";

type Props = {
  data: any;
  settings: any;
  cartClass: string;
};

const TabContent: FC<Props> = ({ data, settings, cartClass }) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  const param = `/${data?.id}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  if (loading) {
    return (
      <Row className="no-slider">
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
      </Row>
    );
  }

  if (products?.length > 0) {
    return settings?.layout_type === "slider" ? (
      <>
        <Slider
          {...sliderConfig(settings?.slider, settings?.show, products.length)}
          className="product-4 product-m no-arrow"
        >
          {products &&
            products.length > 0 &&
            products.map((product, index) => (
              <div key={index}>
                <ProductItem
                  product={product}
                  cartClass={cartClass}
                  styles={{
                    width:
                      products?.length < 4
                        ? `${16.67 * products?.length}%`
                        : "auto",
                  }}
                />
              </div>
            ))}
        </Slider>
        {hasMore && (
          <div className="my-4">
            <div style={{ textAlign: "center" }}>
              <Link
                href={linkHandler(data, allMenus)}
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
          className={`no-slider row-cols-${Number(settings?.show?.mobile_row)}`}
          xl={Number(settings?.show?.desktop_row)}
          lg={Number(settings?.show?.tablet_row)}
        >
          {products &&
            products.length > 0 &&
            products.map((product, i) => (
              <Col key={i}>
                <ProductItem
                  product={product}
                  cartClass={cartClass}
                  productClass="mw-100"
                />
              </Col>
            ))}
        </Row>
        {hasMore && (
          <div className="my-4">
            <div style={{ textAlign: "center" }}>
              <Link
                href={linkHandler(data, allMenus)}
                className="rounded btn btn-sm btn-outline-primary"
              >
                More Products <i className="ml-2 fa fa-arrow-right" />
              </Link>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return (
      <Row className="no-slider">
        <Col xs="12">
          <div>
            <div className="text-center col-sm-12 empty-cart-cls">
              <Media
                src={emptySearch}
                className="mx-auto mb-4 img-fluid"
                alt=""
              />
              <h3>
                <strong>No Products Here!</strong>
              </h3>
              <h4>Explore more shortlist some items.</h4>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
};

type ProType = {
  data: any;
  designClass: string;
  cartClass: string;
  inner?: string;
  fluid?: boolean;
};

const ProductTabCollection1: FC<ProType> = ({
  data,
  fluid,
  designClass,
  cartClass,
  inner,
}) => {
  const [activeTab, setActiveTab] = useState(
    data && data.list && data.list.length > 0 ? data.list[0] : []
  );

  let storeData = useSelector(selectStoreData);
  const categoryList = storeData?.menu_list;

  return (
    <div>
      <section
        className={designClass}
        style={{ ...styleGenerator(data?.setting?.styles) }}
      >
        <Container fluid={fluid}>
          {data?.title ? (
            <div className={`title1 section-t-space`}>
              <h2>{data?.title}</h2>
              <h4 className={inner}>{data?.subtitle}</h4>
              <div className="line" />
            </div>
          ) : (
            ""
          )}

          <div className="theme-tab">
            <div className="tabs tab-title flow-scroll">
              <ul className={"tabs tab-title pt-3"}>
                {data &&
                  data.list &&
                  data.list.length > 0 &&
                  data.list.map((item: any, i: number) => (
                    <li
                      key={i}
                      className={`btn btn-outline rounded mx-1 py-2 ${
                        activeTab.id == item.id ? "active" : ""
                      }`}
                      onClick={() => setActiveTab(item)}
                    >
                      {categoryList.filter((f: any) => f.id === item.id)[0]
                        ? categoryList.filter((f: any) => f.id === item.id)[0]
                            .title
                        : "NEW ARRIVAL"}
                    </li>
                  ))}
              </ul>
            </div>

            <TabContent
              data={activeTab}
              settings={data?.setting}
              cartClass={cartClass}
            />
          </div>
        </Container>
      </section>
    </div>
  );
};

export { ProductTabCollection1 };
