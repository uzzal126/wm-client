import { useFilter } from "@/contexts/filter/FilterProvider";
import PostLoader from "@/helpers/preloader/PostLoader";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import ReactLoading from "react-loading";
import { Col, Media, Row } from "reactstrap";
import LayoutSwitcher from "../account/common/LayoutSwitcher";
import ContinueShoppingBtn from "../buttons/ContinueShoppingBtn";
import { useQueryProducts } from "../Collections/hooks/useQueryCampaignProductsSlug";
import ProductItem from "../widgets/product-box/ProductBox1";
import ProductItemList from "../widgets/product-box/ProductBoxList";
//needs rtk but unused

type Props = {
  colClass?: any;
  layoutList?: any;
  openSidebar?: any;
  noSidebar?: any;
};

export default function ProductList({
  colClass,
  layoutList,
  openSidebar,
  noSidebar,
}: Props) {
  const router = useRouter();
  const { id } = router.query;
  // let loading = false;
  const { setParam, getParams, apiSlug, sort, order } = useFilter();

  const [sortBy, setSortBy] = useState("AscOrder");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState<any>([]);
  const [windowWidth, setWindowWidth] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [grid, setGrid] = useState(colClass);
  const [queryString, setQueryString] = useState("?page=1&items_per_page=10");

  const { products, hasMore, loading, campaignDetails } = useQueryProducts(
    `/${id ? id : "0"}?${apiSlug}`,
    page
  );

  const observer: any = useRef();
  const lastProductElementRef = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [queryString]);

  return (
    <Col className="collection-content" id="infinite-scroll-container">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <div className="top-banner-wrapper">
              <a href={"#"}>
                {campaignDetails && (
                  <Media
                    src={
                      windowWidth < 750
                        ? campaignDetails?.mobile_image
                        : campaignDetails?.desktop_image
                    }
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                )}
              </a>
              {campaignDetails && (
                <div className="text-center top-banner-content small-section text-lg-left">
                  <h4>{campaignDetails?.name || campaignDetails["NAME"]}</h4>
                </div>
              )}
            </div>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                <Row>
                  <Col>
                    <div className="product-filter-content flex-column flex-lg-row">
                      <div className="collection-view">
                        <ul style={{ minWidth: "400px" }}>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                              style={{
                                fontSize: 16,
                                color:
                                  grid === "col-lg-3"
                                    ? "var(--theme-deafult)"
                                    : "#212529",
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-table list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-6");
                              }}
                              style={{
                                fontSize: 16,
                                color:
                                  grid === "col-lg-6"
                                    ? "var(--theme-deafult)"
                                    : "#212529",
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="mx-2 fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                              style={{
                                fontSize: 16,
                                color:
                                  grid === "col-lg-12"
                                    ? "var(--theme-deafult)"
                                    : "#212529",
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { opacity: 0 }
                            : { opacity: 1 }
                        }
                      >
                        <LayoutSwitcher setLayout={setGrid} value={grid} />
                      </div>
                      <div className="px-5 mb-3 p-lg-0 mx-lg-0">
                        <Form.Select
                          aria-label="Sorting items"
                          className="mt-2 rounded form-control"
                          onChange={(e) => setParam("sort", e.target.value)}
                          style={{ cursor: "pointer" }}
                          defaultValue={""}
                          value={
                            `${sort}-${order}` === "price-desc"
                              ? "HighToLow"
                              : `${sort}-${order}` === "price-asc"
                              ? "LowToHigh"
                              : `${sort}-${order}` === "name-asc"
                              ? "nameAsc"
                              : `${sort}-${order}` === "name-desc"
                              ? "nameDesc"
                              : `${sort}-${order}` === "id-desc"
                              ? "idNew"
                              : `${sort}-${order}` === "id-asc"
                              ? "idOld"
                              : ""
                          }
                        >
                          <option value="">Sort Products</option>
                          {/* <option value="HighToLow">Price: High To Low</option>
                          <option value="LowToHigh">Price: Low To High</option> */}
                          <option value="idNew">Newest</option>
                          <option value="idOld">Oldest</option>
                          <option value="nameAsc">Name: Asc Order</option>
                          <option value="nameDesc">Name: Desc Order</option>
                        </Form.Select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {loading ? (
                    <div className="mx-0 mt-4 row margin-default">
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
                  ) : [...products]?.length === 0 ? (
                    <Col xs="12">
                      <div>
                        <div className="text-center col-sm-12 empty-cart-cls">
                          <img
                            src={`/assets/images/empty-search.jpg`}
                            className="mx-auto mb-4 img-fluid"
                            alt=""
                          />
                          <h3>
                            <strong>No Products Found!</strong>
                            <div className="mt-3">
                              <ContinueShoppingBtn
                                link="/shop"
                                text="Explore More"
                                onClickFunc={() => null}
                                fontSize={22}
                                showIcon={false}
                              />
                            </div>
                          </h3>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    [...products]?.map((product: any, i: any) => {
                      if (products?.length === i + 1) {
                        return (
                          <div
                            className={grid}
                            ref={lastProductElementRef}
                            key={i}
                          >
                            <div className="product">
                              <div>
                                {grid !== "col-lg-3" && (
                                  <ProductItemList
                                    product={product}
                                    cartClass="cart-info cart-wrap"
                                    showQuickOptions={grid === "col-lg-12"}
                                  />
                                )}
                                {grid === "col-lg-3" && (
                                  <ProductItem
                                    product={product}
                                    cartClass="cart-info cart-wrap"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className={grid} key={i}>
                            <div className="product">
                              <div>
                                <ProductItem
                                  product={product}
                                  cartClass="cart-info cart-wrap"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  )}
                </Row>
              </div>
              {isLoading && (
                <div
                  className="mx-0 mt-4 row margin-default"
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    display: "flex",
                  }}
                >
                  <ReactLoading
                    type={"bubbles"}
                    color={getComputedStyle(
                      document.documentElement
                    ).getPropertyValue("--theme-deafult")}
                  />
                </div>
              )}
              {!loading && products?.length <= 0 && (
                <div className="section-t-space">
                  <div className="text-center">
                    <Row>
                      <Col xl="12" md="12" sm="12">
                        <span style={{ fontWeight: "bolder", color: "gray" }}>
                          No more products!
                        </span>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
}
