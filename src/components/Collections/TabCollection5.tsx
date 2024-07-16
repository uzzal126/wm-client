import Link from "next/link";
import { FC, Fragment, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import {
  getProductURL,
  getThumbnail,
  linkHandler,
  sliderConfig,
  styleGenerator,
} from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import {
  PriceParties,
  RatingMake,
} from "../widgets/product-box/includes/parties";
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

  return (
    <>
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
      ) : products && products?.length > 0 ? (
        <>
          {settings?.layout_type === "slider" ? (
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
                  products.map((item: any, i: number) => (
                    <Col key={i}>
                      <div className="tab-box mw-100">
                        <div
                          className="product-box2"
                          style={{
                            width:
                              products?.length < 4
                                ? `${16.67 * products?.length}%`
                                : "auto",
                          }}
                        >
                          <div className="media">
                            <Link href={getProductURL(item)}>
                              <Media
                                className="img-fluid blur-up lazyload"
                                src={getThumbnail(item)}
                                alt=""
                                style={{
                                  maxWidth: 160,
                                }}
                              />
                            </Link>
                            <div className="media-body align-self-center">
                              <RatingMake size={16} total={item?.rating?.avg} />
                              <Link href={getProductURL(item)}>
                                <h6>{item.title || item?.name}</h6>
                              </Link>
                              <PriceParties product={item} />
                              {/* <ul className='color-variant'>
                          <li className='bg-light0'></li>
                          <li className='bg-light1'></li>
                          <li className='bg-light2'></li>
                        </ul> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
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
                className={`product-tab row-cols-${Number(
                  settings?.show?.mobile_row
                )}`}
                xl={Number(settings?.show?.desktop_row)}
                lg={Number(settings?.show?.tablet_row)}
              >
                {products &&
                  products.length > 0 &&
                  products.map((item: any, i: number) => (
                    <Col className="mb-3" key={i}>
                      <div className="rounded tab-box mw-100">
                        <div className="product-box2">
                          <div className="media">
                            <Link href={getProductURL(item)}>
                              <Media
                                className="img-fluid blur-up lazyload"
                                src={getThumbnail(item)}
                                alt=""
                                style={{
                                  maxWidth: 160,
                                }}
                              />
                            </Link>
                            <div className="media-body align-self-center">
                              <RatingMake size={16} total={item?.rating?.avg} />
                              <Link href={getProductURL(item)}>
                                <h6>{item.title || item?.name}</h6>
                              </Link>
                              <PriceParties product={item} />
                            </div>
                          </div>
                        </div>
                      </div>
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
        </>
      ) : (
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
      )}
    </>
  );
};

type ProType = {
  data: any;
};

const ProductTabCollection5: FC<ProType> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(
    data && data.list && data.list.length > 0 ? data.list[0] : []
  );

  let storeData = useSelector(selectStoreData);
  const categoryList = storeData?.menu_list;

  return (
    <Fragment>
      <section
        className="p-0"
        style={{ ...styleGenerator(data?.setting?.styles) }}
      >
        <div className="tab-bg">
          <Container fluid={true}>
            <Row>
              <Col>
                <div className="title4">
                  <h2 className="title-inner4">{data?.title}</h2>
                  <div className="line">
                    <span></span>
                  </div>
                </div>
                <div className="theme-tab">
                  <div className="tabs tab-title flow-scroll">
                    <ul className={"tabs tab-title my-1"}>
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
                            {categoryList &&
                            categoryList?.length > 0 &&
                            categoryList.filter((f: any) => f.id === item.id)[0]
                              ? categoryList.filter(
                                  (f: any) => f.id === item.id
                                )[0].title
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
        </div>
      </section>
    </Fragment>
  );
};

export { ProductTabCollection5 };
