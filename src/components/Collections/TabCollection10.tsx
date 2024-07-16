import Link from "next/link";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { linkHandler, sliderConfig, styleGenerator } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox10";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
};

const TabContent: FC<Props> = ({ data, settings }) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  const param = `/${data?.id}?page=1&items_per_page=${
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
            <Media
              src="/assets/images/empty-search.jpg"
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
    );

  return (
    <div>
      {settings?.layout_type === "slider" ? (
        <>
          <Slider
            {...sliderConfig(settings?.slider, settings?.show, products.length)}
            className="product-4 product-m no-arrow"
          >
            {products &&
              products.length > 0 &&
              products.map((product, index) => (
                <div key={index}>
                  <ProductItem product={product} />
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
            className={`margin-default row-cols-${Number(
              settings?.show?.mobile_row
            )}`}
            xl={Number(settings?.show?.desktop_row)}
            lg={Number(settings?.show?.tablet_row)}
          >
            {products &&
              products.length > 0 &&
              products.map((item, i) => (
                <Col key={i}>
                  <ProductItem product={item} productClass={"mw-100"} />
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
      )}
    </div>
  );
};

type ProType = {
  data: any;
};

const ProductTabCollection10: FC<ProType> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(
    data && data.list && data.list.length > 0 ? data.list[0] : []
  );

  let storeData = useSelector(selectStoreData);
  const categoryList = storeData?.menu_list;
  const general_settings = storeData?.data?.general_settings;
  const primary_color = general_settings?.primary_color;

  return (
    <>
      <div className="title4 section-t-space">
        <h4>{data?.subtitle}</h4>
        <h2 className="title-inner4">{data?.title}</h2>
        <div className="line">
          <span></span>
        </div>
      </div>
      <section
        className="section-b-space p-t-0 absolute-product ratio_asos"
        style={{ ...styleGenerator(data?.setting?.styles) }}
      >
        <Container>
          <Row>
            <Col>
              <div className="theme-tab">
                <div className="tabs tab-title flow-scroll">
                  <ul className={"tabs tab-title my-1"}>
                    {data &&
                      data.list &&
                      data.list.length > 0 &&
                      data.list.map((item: any, i: any) => (
                        <li
                          key={i}
                          className={`btn btn-outline rounded mx-1 py-2 ${
                            activeTab.id == item.id ? "active" : ""
                          }`}
                          onClick={() => setActiveTab(item)}
                        >
                          {categoryList &&
                          categoryList?.length > 0 &&
                          categoryList.filter((f: any) => f.id === item.id)[0]
                            ? categoryList.filter(
                                (f: any) => f.id === item.id
                              )[0].title ||
                              categoryList.filter(
                                (f: any) => f.id === item.id
                              )[0].text
                            : "NEW ARRIVAL"}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="tab-content-cls">
                  <div className="tab-content active default">
                    <TabContent data={activeTab} settings={data?.setting} />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export { ProductTabCollection10 };
