import Link from "next/link";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { linkHandler, sliderConfig, styleGenerator } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox12";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
  spanClass: boolean;
};

const TabContent: FC<Props> = ({ data, settings, spanClass }) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  const param = `/${data?.id}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  return (
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
      ) : !products || products.length === 0 ? (
        <div className="row">
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
      ) : (
        <>
          <Slider
            {...sliderConfig(settings?.slider, settings?.show, products.length)}
            className="product-3 product-m no-arrow"
          >
            {products &&
              products.length > 0 &&
              products.map((product, index) => (
                <ProductItem
                  product={product}
                  key={index}
                  spanClass={spanClass}
                  styles={{
                    width:
                      products?.length < 4
                        ? `${16.67 * products?.length}%`
                        : "auto",
                  }}
                />
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
      )}
    </div>
  );
};

type ProType = {
  data: any;
  spanClass: boolean;
};

const ProductTabCollection9: FC<ProType> = ({ data, spanClass }) => {
  const [activeTab, setActiveTab] = useState(
    data && data.list && data.list.length > 0 ? data.list[0] : []
  );

  let storeData = useSelector(selectStoreData);
  const categoryList = storeData?.menu_list;

  return (
    <>
      <section
        className="py-5 full-banner parallax tools-parallax-product tab-left ratio_square tools-grey border-box bg-size blur-up lazyloaded"
        style={{ ...styleGenerator(data?.setting?.styles) }}
      >
        <Container>
          <Row>
            <Col>
              <div className="theme-tab">
                <div className="left-side">
                  <div className="left-tab-title">
                    <h4>{data?.subtitle}</h4>
                    <h2>{data?.title}</h2>
                  </div>
                  <div className="tabs tab-title flow-scroll">
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
                  </div>
                </div>
                <div className="tab-content-cls">
                  <div className="tab-content active default">
                    <TabContent
                      data={activeTab}
                      settings={data?.setting}
                      spanClass={spanClass}
                    />
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

export { ProductTabCollection9 };
