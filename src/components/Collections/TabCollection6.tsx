import Link from "next/link";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { linkHandler, sliderConfig, styleGenerator } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox8";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
  cartClass: string;
};

const TabContent: FC<Props> = ({ data, cartClass, settings }) => {
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
      ) : !products || products?.length == 0 ? (
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
      ) : (
        <>
          <Slider
            {...sliderConfig(settings?.slider, settings?.show, products.length)}
            className="product-4 product-m no-arrow"
          >
            {products &&
              products.length > 0 &&
              products.map((product, i) => (
                <ProductItem key={i} product={product} cartClass={cartClass} />
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
  cartClass: string;
  designClass: any;
};

const ProductTabCollection6: FC<ProType> = ({
  data,
  cartClass,
  designClass,
}) => {
  const [activeTab, setActiveTab] = useState(
    data && data.list && data.list.length > 0 ? data.list[0] : []
  );

  let storeData = useSelector(selectStoreData);
  const categoryList = storeData?.menu_list;

  return (
    <section
      className={designClass}
      style={{ ...styleGenerator(data?.setting?.styles) }}
    >
      <Container>
        <div className="title2">
          <h4>{data?.subtitle}</h4>
          <h2 className="title-inner2">{data?.title}</h2>
        </div>
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
                          ? categoryList.filter((f: any) => f.id === item.id)[0]
                              .title
                          : "NEW ARRIVAL"}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="tab-content-cls">
                <div className="tab-content active default">
                  <TabContent
                    data={activeTab}
                    cartClass={cartClass}
                    settings={data?.setting}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { ProductTabCollection6 };
