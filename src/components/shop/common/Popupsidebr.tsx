import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import LayoutSwitcher from "@/components/account/common/LayoutSwitcher";
import ProductItem from "@/components/widgets/product-box/ProductBox1";
import { useFilter } from "@/contexts/filter/FilterProvider";
import { ImageHelper } from "@/helpers/lazy-load-image/image-lazy-load";
import { ShopProps } from "../core/type";
import FilterPage from "./filter";

const Menu2 = "/assets/images/mega-menu/2.jpg";

const Popupsidebar = ({ response }: ShopProps) => {
  // const [sortBy, setSortBy] = useState("AscOrder");
  // const [isLoading, setIsLoading] = useState(false);
  const [grid, setGrid] = useState("col-xl-3 col-6 col-grid-box");
  const [layout, setLayout] = useState<string>("");
  const [sidebarView, setSidebarView] = useState(false);
  const { setParam, sort, order } = useFilter();
  // const [data, setData] = useState([]);
  // const [products, setProducts] = useState([]);
  // const [priceMax, setPriceMax] = useState(500);
  // const [page, setPage] = useState(1);

  // const loading = false;

  // const handlePagination = async () => {
  //   setIsLoading(true);
  //   let query = "";
  //   if (selectedCategory != "all" || slug) {
  //     query += `&category_slug=${slug || selectedCategory || ""}`;
  //   }
  //   if (selectedBrands?.length > 0) {
  //     query += `&brand=${selectedBrands}`;
  //   }
  //   if (selectedValues?.length > 0) {
  //     query += `&filter=${selectedValues}`;
  //   }
  //   query += `&page=${page + 1}&items_per_page=10`;
  //   const res = await getQueryRequest(
  //     `${GET_PRODUCT_LIST_BY_CATEGORY}?${query}`
  //   );
  //   setIsLoading(false);
  //   if (res?.success) {
  //     setData(res);
  //     setPage(page + 1);
  //     setProducts([...products, ...(res?.data || [])]);
  //     const max = Math.max(...res?.data?.map((o) => o?.price?.max));
  //     setPriceMax(max);
  //   }
  // };

  const openNav = () => {
    setSidebarView(!sidebarView);
  };

  // const removeBrand = (val) => {
  //   const temp = [...selectedBrands];
  //   temp.splice(selectedBrands.indexOf(val), 1);
  //   filterContext.setSelectedBrands(temp);
  // };

  // const removeSize = (val) => {
  //   const temp = [...selectedSize];
  //   temp.splice(selectedSize.indexOf(val), 1);
  //   filterContext.setSelectedSize(temp);
  // };

  // const removeColor = () => {
  //   filterContext.setSelectedColor("");
  // };

  // useEffect(() => {
  //   getProducts();
  // }, [selectedBrands, selectedColor, selectedSize, selectedPrice]);

  // const getProducts = async () => {
  //   let query = "";
  //   if (selectedCategory != "all" || slug) {
  //     query += `&category_slug=${slug || selectedCategory || ""}`;
  //   }
  //   if (selectedBrands?.length > 0) {
  //     query += `&brand=${selectedBrands}`;
  //   }
  //   if (selectedValues?.length > 0) {
  //     query += `&filter=${selectedValues}`;
  //   }
  //   query += `&page=${page}&items_per_page=10`;
  //   const res = await getQueryRequest(
  //     `${GET_PRODUCT_LIST_BY_CATEGORY}?${query}`
  //   );
  //   if (res?.success) {
  //     setData(res);
  //     setProducts(res?.data);
  //     const max = Math.max(...res?.data?.map((o) => o?.price?.max));
  //     setPriceMax(max);
  //   }
  // };

  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            <div className="top-banner-wrapper">
              <a>
                {response?.category?.image && (
                  <ImageHelper src={Menu2} className="img-fluid" alt="" />
                )}
              </a>
              {response?.category?.title && (
                <div className="top-banner-content small-section">
                  <h4>{response?.category?.title}</h4>
                </div>
              )}
            </div>
            <Row>
              {/* <Col xs="12">
                <ul className="product-filter-tags">
                  {selectedBrands.map((brand, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {brand}
                        <i
                          className="fa fa-close"
                          onClick={() => removeBrand(brand)}></i>
                      </a>
                    </li>
                  ))}
                  {selectedColor ? (
                    <li>
                      <a href={null} className="filter_tag">
                        {selectedColor}
                        <i className="fa fa-close" onClick={removeColor}></i>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {selectedSize.map((size, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {size}
                        <i
                          className="fa fa-close"
                          onClick={() => removeSize(size)}></i>
                      </a>
                    </li>
                  ))}
                  {
                    <li>
                      <a href={null} className="filter_tag">
                        price: {selectedPrice.min}- {selectedPrice.max}
                      </a>
                    </li>
                  }
                </ul>
              </Col> */}
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                <Row>
                  <Col>
                    <div className="popup-filter">
                      <div className="sidebar-popup" onClick={() => openNav()}>
                        <a className="popup-btn">filter products</a>
                      </div>
                      <div
                        id="filterpopup"
                        className={`open-popup ${sidebarView ? "open" : ""}`}
                      >
                        <FilterPage
                          sidebarView={sidebarView}
                          closeSidebar={() => openNav()}
                          response={response}
                        />
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                // setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                // setGrid("col-lg-12");
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
                      <div className="product-page-per-view">
                        <select
                        // onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                          <option value="10">10 Products Par Page</option>
                          <option value="15">15 Products Par Page</option>
                          <option value="20">20 Products Par Page</option>
                        </select>
                      </div>
                      <Form.Select
                        aria-label="Sorting items"
                        className="mt-2 rounded-lg form-control"
                        onChange={e => setParam("sort", e.target.value)}
                        style={{ cursor: "pointer" }}
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
                        <option value="HighToLow">Price: High To Low</option>
                        <option value="LowToHigh">Price: Low To High</option>
                        <option value="idNew">Newest</option>
                        <option value="idOld">Oldest</option>
                        <option value="nameAsc">Name: Asc Order</option>
                        <option value="nameDesc">Name: Desc Order</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!response.data || response.data?.length == 0 ? (
                    <div className="mx-0 mt-3 row margin-default">
                      {/* <div className="col-xl-3 col-lg-4 col-6">
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
                      </div> */}
                      Product Not Found
                    </div>
                  ) : (
                    response.data &&
                    response.data?.length > 0 &&
                    response.data?.map((product: any, i: number) => (
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
                    ))
                  )}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default Popupsidebar;
