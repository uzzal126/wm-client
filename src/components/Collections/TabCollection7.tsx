import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Col, Container, Media, Row } from "reactstrap";
import { CurrencyContext } from "../../contexts/Currency/CurrencyContext";
import {
  getPriceStringWithDiscount,
  getPriceStringWithoutDiscount,
  linkHandler,
  styleGenerator,
} from "../../helpers/misc";
import { getProductsByCatId } from "../../helpers/services/request";
import { Product4 } from "../../helpers/services/script";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductSection from "../widgets/product-box/ProductBox6";
import { RatingMake } from "../widgets/product-box/includes/parties";

const banner1 = "/assets/images/offer-banner1.jpg";

const TabContent = ({ data, startIndex, endIndex }: any) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  return (
    <>
      <Slider
        {...Product4}
        className="product-4 game-product product-m no-arrow slick-initialized slick-slider"
      >
        {data &&
          data.slice(startIndex, endIndex).map((product: any, index: any) => (
            <div key={index}>
              <ProductSection product={product} key={index} />
            </div>
          ))}
      </Slider>
      <div className="my-4">
        <div style={{ textAlign: "center" }}>
          <Link
            href={linkHandler(data, allMenus)}
            className="btn btn-sm btn-outline-primary rounded"
          >
            More Products <i className="fa fa-arrow-right ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
};

const ProductTabCollection7 = ({ data }: any) => {
  const curContext: any = useContext(CurrencyContext);
  const currency = curContext.state;
  const settings = data?.setting;

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(data?.id);
  }, [data]);

  const getProducts = async (id: any) => {
    setLoading(true);
    const res = await getProductsByCatId(id, settings?.show?.no_of_item_show);
    setLoading(false);
    if (res.success && res.status_code === 200) {
      setProducts(res.data);
    } else {
      setProducts([]);
    }
  };

  return (
    <section
      className="tools_product bg-title section-b-space "
      style={{ ...styleGenerator(data?.setting?.styles) }}
    >
      <Container>
        <Row className="multiple-slider">
          <Col xl="4" lg="4" md="12">
            <div className="theme-card">
              <h5 className="title-border">Under $20 | Free delivery</h5>
              <Slider className="offer-slider slide-1">
                <div>
                  {products &&
                    products?.length > 0 &&
                    products?.slice(5, 9).map((product: any, index: any) => (
                      <div className="media" key={index}>
                        <a href={"#"}>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={
                              product?.thumbnail?.src ||
                              product?.variants[0]?.thumbnail
                            }
                            alt={product?.thumbnail?.alt}
                          />
                        </a>
                        <div className="media-body align-self-center">
                          <div className="rating">
                            <RatingMake
                              size={16}
                              total={product?.rating?.avg}
                            />
                          </div>
                          <a href={"#"}>
                            <h6>{product?.name}</h6>
                          </a>
                          <h4>
                            {currency.symbol}
                            {getPriceStringWithDiscount(product)}
                            {product?.discount?.amount > 0 && (
                              <del>
                                <span className="money">
                                  {currency.symbol}
                                  {getPriceStringWithoutDiscount(product)}
                                </span>
                              </del>
                            )}
                          </h4>
                        </div>
                      </div>
                    ))}
                </div>
                <div>
                  {products &&
                    products?.length > 0 &&
                    products?.slice(9, 12).map((product: any, index: any) => (
                      <div className="media" key={index}>
                        <a href={"#"}>
                          <Media
                            className="img-fluid blur-up lazyload"
                            src={
                              product?.thumbnail?.src ||
                              product?.variants[0]?.thumbnail
                            }
                            alt={product?.thumbnail?.alt}
                          />
                        </a>
                        <div className="media-body align-self-center">
                          <div className="rating">
                            {" "}
                            <RatingMake
                              size={16}
                              total={product?.rating?.avg}
                            />
                          </div>
                          <a href={"#"}>
                            <h6>{product?.name}</h6>
                          </a>
                          <h4>
                            {currency.symbol}
                            {getPriceStringWithDiscount(product)}
                            {product?.discount?.amount > 0 && (
                              <del>
                                <span className="money">
                                  {currency.symbol}
                                  {getPriceStringWithoutDiscount(product)}
                                </span>
                              </del>
                            )}
                          </h4>
                        </div>
                      </div>
                    ))}
                </div>
              </Slider>
            </div>
          </Col>
          <Col xl="8" lg="8" md="12">
            <Tabs className="theme-tab">
              <div className="bg-title-part">
                <h5 className="title-border">RECOMMENDATIONS FOR YOU</h5>
                <TabList className="tabs tab-title">
                  <Tab className="current">New Products</Tab>
                  <Tab className="">Featured Products</Tab>
                </TabList>
              </div>
              <div className="tab-content-cls ratio_asos">
                <TabPanel className="tab-content active default">
                  <TabContent data={products} startIndex={0} endIndex={8} />
                </TabPanel>
                <TabPanel className="tab-content active default">
                  <TabContent data={products} startIndex={4} endIndex={12} />
                </TabPanel>
              </div>
            </Tabs>
            <div className="banner-tools">
              <Media src={banner1} alt="" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { ProductTabCollection7 };
