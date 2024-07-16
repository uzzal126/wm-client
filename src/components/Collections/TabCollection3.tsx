import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { useAppDispatch } from "@/store";
import Link from "next/link";
import { FC, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { linkHandler, sliderConfig, styleGenerator } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { TAG_LIST } from "../../helpers/services/api";
import {
  getProductsByCatId,
  getProductsByTagId,
  getQueryRequest,
} from "../../helpers/services/request";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductItem from "../widgets/product-box/ProductBox12";
import LeftCollection from "./LeftCollection";

type Props = {
  data: any;
  settings: any;
  tagCollection?: boolean;
  spanClass: boolean;
};

const TabContent: FC<Props> = ({
  data,
  tagCollection,
  spanClass,
  settings,
}) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;
  const hasMore = false;

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState<any>({});

  useEffect(() => {
    if (data?.id == 0) return;
    getProducts(data?.id);
  }, [data]);

  const getProducts = async (id: any) => {
    setLoading(true);
    let res = [];
    if (tagCollection) {
      res = await getProductsByTagId(id, settings?.show?.no_of_item_show);
    } else {
      res = await getProductsByCatId(id, settings?.show?.no_of_item_show);
    }
    setLoading(false);
    if (res.success && res.status_code === 200) {
      if (tagCollection) {
        const res2 = await getQueryRequest(TAG_LIST);
        if (res2?.success && res2?.data?.length > 0) {
          const tag = res2?.data?.filter((e: any) => e?.id == id)[0];
          if (tag) {
            setCategory(tag);
          }
        }
      } else {
        setCategory(res.category[0]);
      }
      setProducts(res.data);
    }
  };

  if (loading) return <PostLoader />;

  return (
    <>
      {!products || products.length === 0 || loading ? (
        loading ? (
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
        ) : (
          <Col xs="12">
            <div>
              <div className="col-sm-12 empty-cart-cls text-center">
                <Media
                  src="/assets/images/empty-search.jpg"
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
        )
      ) : (
        <>
          <Slider
            {...sliderConfig(settings?.slider, settings?.show, products.length)}
            className="product-4 product-m no-arrow">
            {products &&
              products.length > 0 &&
              products.map((product, i) => (
                <ProductItem
                  product={product}
                  spanClass={spanClass}
                  key={i}
                  styles={{
                    width: products?.length < 4 ? `50%` : "auto",
                  }}
                />
              ))}
          </Slider>
            {hasMore && (
              <div className="my-4">
                <div style={{ textAlign: "center" }}>
                  <Link
                    href={linkHandler(data, allMenus)}
                    className="btn btn-sm btn-outline-primary rounded">
                    More Products <i className="fa fa-arrow-right ml-2" />
                  </Link>
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
};

type ProType = {
  data: any;
  designClass?: string;
  tagCollection?: boolean;
  spanClass: boolean;
};

const ProductTabCollection3: FC<ProType> = ({
  data,
  tagCollection,
  designClass,
  spanClass,
}) => {
  const [activeTab, setActiveTab] = useState(
    data && data.list && data.list.length > 1 ? data.list[1] : []
  );
  const [itemTitle, setItemTitle] = useState<any>([]);
  let storeData = useSelector(selectStoreData);
  const categoryList = storeData?.menu_list;
  const banner = "/assets/images/tools/banner.jpg";

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = [];
    if (tagCollection) {
      res = await getQueryRequest(TAG_LIST);
      setItemTitle(res?.data || res || []);
    } else {
      setItemTitle(categoryList);
    }
  };

  return (
    <Fragment>
      <section
        className="tools_product"
        style={{ ...styleGenerator(data?.setting?.styles) }}>
        <Container>
          <Row className="multiple-slider">
            <Col xl="3" lg="4" md="12">
              <LeftCollection
                data={data && data.list && data.list.length > 0 && data.list[0]}
                settings={data?.setting}
                tagCollection={tagCollection}
                show={4}
              />
            </Col>
            <Col xl="9" lg="8" md="12" className={designClass}>
              <Container className="p-0">
                <div className="theme-tab">
                  <div className="tabs tab-title flow-scroll">
                    <ul className="tabs tab-title">
                      {data &&
                        data.list &&
                        data.list.length > 0 &&
                        data.list
                          .slice(1, data.list.length)
                          .map((item: any, i: number) => (
                            <li
                              key={i}
                              className={`btn btn-outline rounded mx-1 py-2 ${
                                activeTab.id == item.id ? "active" : ""
                              }`}
                              onClick={() => setActiveTab(item)}>
                              {itemTitle &&
                              itemTitle?.length > 0 &&
                              itemTitle.filter((f: any) => f.id === item.id)[0]
                                ? itemTitle.filter(
                                    (f: any) => f.id === item.id
                                  )[0]?.text ||
                                  itemTitle.filter(
                                    (f: any) => f.id === item.id
                                  )[0]?.title
                                : "NEW ARRIVAL"}
                            </li>
                          ))}
                    </ul>
                  </div>
                  <TabContent
                    data={activeTab}
                    settings={data?.setting}
                    spanClass={spanClass}
                    tagCollection={tagCollection}
                  />
                </div>
              </Container>
              {data?.banner_url ? (
                <div className="banner-tools">
                  <Media
                    src={data?.banner_url || banner}
                    alt=""
                    className="img-fluid"
                  />
                </div>
              ) : null}
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export { ProductTabCollection3 };
