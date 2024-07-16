
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import { Col, Container, Media, Row } from "reactstrap";
import ProductBox from "../widgets/product-box/ProductBox9";
import PostLoader from "@/helpers/preloader/PostLoader";
import { ShopProps } from "./core/type";
import { useFilter } from "@/contexts/filter/FilterProvider";
import { productsApi } from "@/redux-handler/api/slices/productSlice";
import { RootState, useAppDispatch } from "@/store";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const Metro = ({ response }: ShopProps) => {
  const col = "metro";

  const {
    max_price,
    min_price,
    brand,
    setParam,
    filter: filterString,
    search,
    queryParam,
    apiSlug,
  } = useFilter();

  const filter = filterString.split(",");
  let brandSplit = brand.split(",").filter((f) => f !== "");
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const res: any = useSelector(
    (state: RootState) =>
      state.api.queries[`getProductByCategory("?${apiSlug}")`]
  );

  const products = res?.data;

  const handleRemoveFilter = (item: string) => {
    const newFilter = filter.filter((f: string) => f !== item);
    setParam("filter", newFilter.toString() || "");
  };

  const handleBrand = (value: any) => {
    brandSplit = brandSplit.filter((f: any) => f !== value);
    setParam("brand", brandSplit.toString() || "");
  };

  const fetchMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (page > 1) {
      const newParam = {
        ...queryParam,
        page: page,
      };
      const params = Object.fromEntries(
        Object.entries(newParam).filter(([_, v]) => v !== "")
      );

      const queryString = new URLSearchParams(params).toString();
      dispatch(
        productsApi.endpoints.getMoreProductByCategory.initiate({
          params: `?${queryString}`,
          searchParam: apiSlug,
        })
      );
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (
      response?.payload &&
      response?.payload?.pagination &&
      response?.payload?.pagination.total > 0
    ) {
      const more =
        Math.ceil(
          response.payload?.pagination.total /
          Number(response.payload?.pagination?.items_per_page)
        ) > page;
      setHasMore(more);
    }
  }, [response?.payload?.pagination, page]);

  if(!res?.data?.success || res?.data?.data?.length == 0) return (
    <div>
      <div className="col-sm-12 empty-cart-cls text-center">
        <img
          src={`/assets/images/empty-search.jpg`}
          className="img-fluid mb-4 mx-auto"
          alt=""
        />
        <h3>
          <strong>No Products Found!</strong>
        </h3>
        <h4>Explore more shortlist some items.</h4>
      </div>
    </div>
  );
  
  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col className="collection-content">
              <InfiniteScroll
                dataLength={(Array.isArray(products?.data) && products?.data?.length) || 0}
                next={fetchMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                // height={window.innerHeight - 450}
                // scrollableTarget="infinityScrollBar"
                className="row">
                <div className="page-main-content">
                  <div className="top-banner-wrapper">

                    <a href={'#'}>

                      {response?.category?.image && (
                        <Media
                          src={response?.category?.image}
                          className="img-fluid blur-up lazyload"
                          alt=""
                        />
                      )}
                    </a>
                    {response?.category?.title && (
                      <div className="top-banner-content small-section">
                        <h4>{response?.category?.title}</h4>
                      </div>
                    )}
                  </div>
                  {/* <Row>
                    <Col xs="12">
                      <ul className="product-filter-tags">
                        {Array.isArray(selectedBrands) && selectedBrands.length > 0 && selectedBrands.map((brand, i) => (
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
                              <i
                                className="fa fa-close"
                                onClick={removeColor}></i>
                            </a>
                          </li>
                        ) : (
                          ""
                        )}
                        {Array.isArray(selectedSize) && selectedSize.length > 0 && selectedSize.map((size, i) => (
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
                    </Col>
                  </Row> */}
                  <div className="collection-product-wrapper">
                    <section className="portfolio-section portfolio-padding metro-section port-col">

                      <Container fluid={"full"}>

                        <Masonry
                          breakpointCols={col == "metro" ? 4 : 6}
                          className="isotopeContainer row"
                          columnClassName={`isotopeSelector ${
                            col == "metro"
                              ? "col-xl-3 col-sm-6"
                              : "col-xl-2 col-lg-3 col-md-4 col-sm-6"
                          }`}>
                          {products && products?.data?.length > 0 ? (

                            products?.data?.map((product: any, index: any) => (

                              <ProductBox
                                product={product}
                                key={index}
                              />
                            ))
                          ) : (products?.data?.length === 0 || !res?.data?.status) ? (
                                <div>
                                  <div className="col-sm-12 empty-cart-cls text-center">
                                    <img
                                      src={`/assets/images/empty-search.jpg`}
                                      className="img-fluid mb-4 mx-auto"
                                      alt=""
                                    />
                                    <h3>
                                      <strong>No Products Found!</strong>
                                    </h3>
                                    <h4>Explore more shortlist some items.</h4>
                                  </div>
                                </div>
                          ) : (
                                (
                                  <Row>
                                    <PostLoader />
                                    <PostLoader />
                                    <PostLoader />
                                  </Row>
                                )
                          )}
                        </Masonry>
                      </Container>
                    </section>
                  </div>
                </div>
              </InfiniteScroll>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Metro;
