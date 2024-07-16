import LayoutSwitcher from "@/components/account/common/LayoutSwitcher";
import ContinueShoppingBtn from "@/components/buttons/ContinueShoppingBtn";
import ShopLoader from "@/components/modules/loaders/shop-loader";
import ProductItemList from "@/components/widgets/product-box/ProductBoxList";
import { useFilter } from "@/contexts/filter/FilterProvider";
import Media from "@/libs/media";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { RootState, useAppDispatch } from "@/store";
import { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import PostLoader from "../../../helpers/preloader/PostLoader";
import ProductItem from "../../widgets/product-box/ProductBox1";
import { ShopProps } from "../core/type";

interface ProductListType extends ShopProps {
  colClass: any;
  layoutList?: any;
  openSidebar?: () => void;
  noSidebar?: any;
  layoutType?: any;
}

const ProductList = ({
  colClass,
  layoutList,
  openSidebar,
  noSidebar,
  response,
  layoutType = "",
}: ProductListType) => {
  const [grid, setGrid] = useState(colClass);
  const sortRef = useRef(null);

  const [layout, setLayout] = useState(layoutList);
  // console.log(response?.data);

  const {
    max_price,
    min_price,
    brand,
    setParam,
    filter: filterString,
    search,
    queryParam,
    apiSlug,
    sort,
    order,
  } = useFilter();

  const filter = filterString.split(",");
  let brandSplit = brand.split(",").filter((f) => f !== "");
  const [hasMore, setHasMore] = useState(true);
  const [dynamicClass, setDynamicClass] = useState("w-100");
  const [page, setPage] = useState(1);
  const [queryString, setQueryString] = useState<any>(null);
  const dispatch = useAppDispatch();
  let storeData: any = useSelector(selectStoreData);
  let shopData = storeData?.data?.general_settings?.shop_page?.body;
  const filterConfig: any = shopData
    ? shopData[
        Object?.keys(shopData || {})?.filter((f) => f.includes("filter"))[0]
      ]
    : null;

  const res: any = useSelector(
    (state: RootState) =>
      state?.api.queries[`getProductByCategory({"params":"?${apiSlug}"})`]
  );
  // console.log('res from', { res });

  type ProductType = {
    data: any;
  };
  const products: ProductType = res?.data;

  const handleRemoveFilter = (item: string) => {
    const newFilter = filter.filter((f: string) => f !== item);
    setParam("filter", newFilter.toString() || "");
  };

  const handleBrand = (value: any) => {
    brandSplit = brandSplit.filter((f: any) => f !== value);
    setParam("brand", brandSplit.toString() || "");
  };

  const fetchMore = () => {
    // console.log("in fetch");
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    // console.log(`page: ${page}`)
    if (window.innerWidth > 600) {
      if (layoutType === "minimal_shop") {
        setDynamicClass("w-100");
      } else {
        setDynamicClass("w-75");
      }
    }
    if (page > 1) {
      // console.log('in page ++')
      //use rtk query
      const newParam = {
        ...queryParam,
        page: page,
      };
      const params = Object.fromEntries(
        Object.entries(newParam).filter(([_, v]) => v !== "")
      );
      const queryString = new URLSearchParams(params).toString();
      setQueryString(queryString);
      dispatch(
        productsApi.endpoints.getMoreProductByCategory.initiate({
          params: `?${queryString}`,
          searchParam: `?${apiSlug}`,
        })
      );
    }
    if (res?.data?.payload?.pagination?.total > 0) {
      // console.log('in has more')
      const more =
        Math.ceil(
          res?.data?.payload?.pagination?.total /
            Number(res?.data?.payload?.pagination?.items_per_page)
        ) > page;
      setHasMore(more);
    }
  }, [page, dispatch]);

  // const {
  //   data: pdData,
  //   error: pdErr,
  //   isLoading: pdLoading,
  // } = useGetMoreProductByCategoryQuery({
  //   params: `?${queryString}`,
  //   searchParam: apiSlug,
  // });

  // useEffect(() => {

  // }, [response?.payload?.pagination, page]);

  // if (res?.data?.success && res?.data?.data?.length === 0)
  //   return <NoMoreProducts />;

  if (!res?.data?.success)
    return (
      <div className={dynamicClass}>
        <div className="py-3 d-flex align-items-center flex-column">
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 50, height: 50 }}
          />
        </div>
      </div>
    );

  if (!res?.data?.success || res?.data?.data?.length == 0)
    return (
      <div className={dynamicClass}>
        <div className="my-5 text-center col-sm-12 empty-cart-cls col-lg-12 col-md-12">
          <img
            src={`/assets/images/empty-search.jpg`}
            className="mx-auto img-fluid mb-3"
            alt="No product found"
          />
          <h3>
            <strong>No Products Found!</strong>
          </h3>
          <h4>Explore more shortlist some items.</h4>
          <div className="mt-3">
            <ContinueShoppingBtn
              link="/shop"
              text="Explore More"
              onClickFunc={() => null}
              fontSize={22}
              showIcon={false}
            />
          </div>
        </div>
      </div>
    );

  return (
    <Col className="collection-content ">
      {res && res?.status != "fulfilled" ? (
        <Col xs="12">
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
        </Col>
      ) : products && products?.data && products?.data?.length === 0 ? (
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
              </h3>
              <h4>Explore more shortlist some items.</h4>
              <div className="mt-3">
                <ContinueShoppingBtn
                  link="/shop"
                  text="Explore More"
                  onClickFunc={() => null}
                  fontSize={22}
                  showIcon={false}
                />
              </div>
            </div>
          </div>
        </Col>
      ) : (
        <InfiniteScroll
          dataLength={
            (Array.isArray(products?.data) && products?.data?.length) || 0
          }
          next={fetchMore}
          hasMore={hasMore}
          loader={<ShopLoader />}
          // endMessage={
          //   <h3 className="text-center">
          //     <strong>No More Products</strong>
          //   </h3>
          // }
          // height={window.innerHeight - 450}
          // scrollableTarget="infinityScrollBar"
          className="row"
        >
          <div className="page-main-content w-100">
            <div className="top-banner-wrapper">
              <a>
                {response?.category?.image && (
                  <Media
                    src={response.category?.image}
                    className="img-fluid blur-up lazyload"
                    alt=""
                  />
                )}
              </a>
              {response?.category?.title && (
                <div className="top-banner-content small-section">
                  <h4>{response.category?.title}</h4>
                </div>
              )}
            </div>
            <Row>
              <Col xs="12" className="mx-5 mx-lg-0">
                <ul
                  className="product-filter-tags"
                  style={{ cursor: "pointer" }}
                >
                  {filterConfig?.filter_by?.length !== 0 &&
                    filterConfig?.filter_by?.includes("price-range") && (
                      <li>
                        <a className="filter_tag">
                          price: {min_price}- {max_price}
                        </a>
                      </li>
                    )}
                  {filterConfig?.filter_by?.length === 0 && (
                    <li>
                      <a className="filter_tag">
                        price: {min_price}- {max_price}
                      </a>
                    </li>
                  )}
                  {!filterConfig && (
                    <li>
                      <a className="filter_tag">
                        price: {min_price}- {max_price}
                      </a>
                    </li>
                  )}

                  {brandSplit.map((item: any, i: number) => (
                    <li key={i}>
                      <a className="filter_tag">
                        {item}
                        <i
                          className="fa fa-close"
                          onClick={() => handleBrand(brand)}
                        ></i>
                      </a>
                    </li>
                  ))}

                  {filter?.length > 0 &&
                    filter?.map(
                      (item: any, indx: any) =>
                        item !== "" && (
                          <li key={indx}>
                            <a className="filter_tag">
                              {item}
                              <i
                                className="fa fa-close"
                                onClick={() => handleRemoveFilter(item)}
                              ></i>
                            </a>
                          </li>
                        )
                    )}
                  {search && (
                    <li>
                      <a className="filter_tag">Search: {search}</a>
                    </li>
                  )}
                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div
                        className="mx-5 filter-main-btn"
                        onClick={() => openSidebar && openSidebar()}
                      >
                        <span className="filter-btn btn btn-theme w-100">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content flex-column flex-lg-row align-items-center">
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
                            : { opacity: 1, width: "300px" }
                        }
                      >
                        <LayoutSwitcher setLayout={setGrid} value={grid} />
                      </div>
                      <div className="px-5 mb-3 mb-lg-0 p-lg-0 mx-lg-0">
                        <Form.Select
                          aria-label="Sorting items"
                          className="rounded form-control"
                          onChange={(e) => setParam("sort", e.target.value)}
                          ref={sortRef}
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
                          style={{ cursor: "pointer" }}
                          defaultValue={""}
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
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {
                    <>
                      {products?.data?.length > 0
                        ? products?.data?.map((product: any, i: any) => (
                            <div className={grid} key={i}>
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
                          ))
                        : null}
                    </>
                  }
                </Row>
              </div>
            </div>
          </div>
        </InfiniteScroll>
      )}
    </Col>
  );
};

export default ProductList;
