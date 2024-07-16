import { getProductsByCatId } from "@/helpers/services/request";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Col, Container, Row } from "reactstrap";
import { linkHandler, styleGenerator } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox1";

const TabContent = ({ data, loading, cartClass }: any) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  return (
    <>
      <Row className="no-slider">
        {!data || data.length === 0 || loading ? (
          data && data.length === 0 ? (
            <Col xs="12">
              <div>
                <div className="col-sm-12 empty-cart-cls text-center">
                  <img
                    src={`/static/images/empty-search.jpg`}
                    className="img-fluid mb-4 mx-auto"
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
            <div className="row mx-0 margin-default">
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
          data &&
          data
            .slice(0, 8)
            .map((product: any, i: any) => (
              <ProductItem product={product} key={i} cartClass={cartClass} />
            ))
        )}
      </Row>
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

const ProductTabCollection2 = ({
  type,
  designClass,
  cartClass,
  noTitle,
  data,
}: any) => {
  const [activeTab, setActiveTab] = useState(type);
  const [loading, setLoading] = useState(false);
  const settings = data?.setting;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts(data?.id);
  }, [data]);

  const getProducts = async (id: any) => {
    setLoading(true);
    const res = await getProductsByCatId(id, settings?.show?.no_of_item_show);
    if (res.success && res.status_code === 200) {
      setProducts(res.data);
      setLoading(false);
    } else {
      setProducts([]);
    }
  };

  return (
    <div>
      {noTitle ? (
        ""
      ) : (
        <div className="title1 section-t-space">
          <h4>exclusive products</h4>
          <h2 className="title-inner1">special products</h2>
        </div>
      )}

      <section
        className={designClass}
        style={{ ...styleGenerator(data?.setting?.styles) }}
      >
        <Container>
          <Tabs className="theme-tab">
            <TabList className="tabs tab-title">
              <Tab
                className={activeTab == type ? "active" : ""}
                onClick={() => setActiveTab(type)}
              >
                NEW ARRIVAL
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                FEATURED{" "}
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                SPECIAL
              </Tab>
            </TabList>

            <TabPanel>
              <TabContent
                data={products}
                loading={loading}
                cartClass={cartClass}
                startIndex={0}
                endIndex={8}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={products}
                loading={loading}
                cartClass={cartClass}
                startIndex={0}
                endIndex={8}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={products}
                loading={loading}
                cartClass={cartClass}
                startIndex={0}
                endIndex={8}
              />
            </TabPanel>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export { ProductTabCollection2 };

