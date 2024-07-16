import { CardBtn } from "@/components/widgets/product-box/includes/btns";
import { PriceParties } from "@/components/widgets/product-box/includes/parties";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Col, Container, Media, Row } from "reactstrap";
import { linkHandler } from "../../../../helpers/misc";
import {
  GET_BLOG_SEARCH_RESULTS,
  GET_PRODUCT_LIST_BY_CATEGORY,
} from "../../../../helpers/services/api";
import { getQueryRequest } from "../../../../helpers/services/request";
import { selectStoreData } from "../../../../redux-handler/reducers/storeDataReducer";

const searchLight = "/assets/images/icon/search_white.svg";
const search = "/assets/images/icon/dark/search_dark.svg";

type Props = {
  inline?: boolean;
  dark?: boolean;
  style?: any;
};

const SearchOverlay: FC<Props> = ({ inline, dark, style }) => {
  let storeData = useSelector(selectStoreData);
  const { data: headerData } = storeData;
  const searchField: MutableRefObject<HTMLInputElement | any> = useRef();
  const myRef: any = useRef();

  const router = useRouter();

  const [key, setKey] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const closeSearch = () => {
    setOpen(false);
  };
  const handleClickOutside = (e: any) => {
    if (!myRef.current.contains(e.target)) {
      setOpen(false);
    }
  };
  const openSearch = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (open) {
      searchField.current?.focus();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const getProducts = async (key: any) => {
    setKey(key);
    setData([]);
    if (key.length > 2) {
      const res = await getQueryRequest(
        `${GET_PRODUCT_LIST_BY_CATEGORY}?search=${key}&page=1&items_per_page=1000`
      );
      if (res?.success && res.status_code === 200) {
        setData(res?.data);
        if (inline) openSearch();
      }
    }
  };

  const getBlogs = async (key: any) => {
    setKey(key);
    setData([]);
    if (key.length > 2) {
      const res = await getQueryRequest(
        `${GET_BLOG_SEARCH_RESULTS}?search=${key}&page=1&items_per_page=1000&order=desc`
      );
      if (res?.success && res.status_code === 200) {
        setData(res?.data);
        if (inline) openSearch();
      }
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSearchClick(e);
    }
  };

  const handleSearchClick = (e: any) => {
    e.preventDefault();
    closeSearch();
    router.push(`/category?search=${key}`);
  };

  return (
    <div ref={myRef}>
      <>
        {!inline ? (
          <div className="onhover-div">
            <div
              id="openId"
              onClick={open ? closeSearch : openSearch}
              style={{
                cursor: "pointer",
              }}
            >
              <Media
                src={
                  headerData?.header?.layout !==
                  "left-logo-on-transparent-back-header"
                    ? search
                    : searchLight
                }
                style={{ width: "24px", height: "24px" }}
                className="img-fluid"
                alt="search"
              />
            </div>
          </div>
        ) : (
          <form className="form_search" role="textbox" style={style}>
            {/* eslint-disable-next-line */}
            <input
              id="query search-autoComplete"
              type="search"
              autoFocus={true}
              ref={searchField}
              placeholder=" Search anything..."
              className="nav-search nav-search-field"
              autoComplete="none"
              onChange={e => {
                if (headerData?.store_info?.store_cat_id === 20) {
                  return getBlogs(e.target.value);
                } else {
                  return getProducts(e.target.value);
                }
              }}
              onKeyPress={handleKeyPress}
            />
            <Button type="submit" variant="primary" onClick={handleSearchClick}>
              <i className="fa fa-search d-block"></i>
            </Button>
          </form>
        )}
      </>
      <div
        id="search-overlay"
        className={`search-overlay shadow ${open ? "d-block" : ""} zoom-in`}
        // data-aos={"fade-down"}
        // data-aos-duration="500"
      >
        <div className="flex-column justify-content-start">
          {(!inline || inline === undefined) && (
            <div className="pt-2 w-100">
              <div className="overlay-content">
                <Container>
                  <Row>
                    <Col xl="12">
                      <div className="mb-3 input-group">
                        <input
                          id="searchInput"
                          type="search"
                          ref={searchField}
                          autoFocus={true}
                          className="form-control"
                          placeholder="Type to search ..."
                          onChange={e => {
                            if (headerData?.store_info?.store_cat_id === 20) {
                              return getBlogs(e.target.value);
                            } else {
                              return getProducts(e.target.value);
                            }
                          }}
                          onKeyPress={handleKeyPress}
                        />

                        <Button
                          type="submit"
                          variant="primary"
                          onClick={handleSearchClick}
                        >
                          <i className="fa fa-search d-block"></i>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          )}
          <div className="w-100">
            <Container>
              <Row>
                {data?.length > 0 &&
                  data?.map((item: any, indx) =>
                    headerData?.store_info?.store_cat_id === 20 ? (
                      <Col lg="6" key={indx}>
                        <Link
                          href={`/blog/${item?.slug}`}
                          onClick={e => {
                            closeSearch();
                          }}
                        >
                          <Card className="flex-row px-2 py-2 mx-2 my-2 media-body align-self-center d-flex">
                            <img
                              src={
                                item?.banner?.src ||
                                item?.thumbnail?.src ||
                                "/assets/images/pro3/39.jpg"
                              }
                              alt={item?.title || item?.name}
                              className="img-fluid blur-up lazyload media"
                              width={100}
                            />
                            <>
                              <Link
                                href={`/blog/${item?.slug}`}
                                onClick={() => closeSearch()}
                                className="mx-2"
                              >
                                <h6>{`${
                                  item?.title?.length >= 50
                                    ? `${item?.title?.slice(0, 50)}...`
                                    : `${item?.title}`
                                }`}</h6>
                                <div
                                  className="mt-2 rounded btn btn-primary"
                                  style={{
                                    background: "var(--theme-deafult)",
                                    border: "none",
                                  }}
                                >
                                  Read More
                                </div>
                              </Link>
                            </>
                          </Card>
                        </Link>
                      </Col>
                    ) : (
                      <Col lg="6" key={indx}>
                        <div className="px-2 py-2 mb-2 border rounded media addtocart_count align-items-center">
                          <Link
                            href={linkHandler(item, storeData?.menu_all)}
                            onClick={e => {
                              closeSearch();
                            }}
                          >
                            <img
                              src={
                                item?.thumbnail?.src ||
                                item?.variants[0]?.thumbnail ||
                                "/assets/images/pro3/39.jpg"
                              }
                              alt={item?.title || item?.name}
                              className="img-fluid blur-up lazyload media"
                              width={50}
                            />
                          </Link>
                          <div className="mx-3 media-body align-self-center">
                            <Link
                              href={linkHandler(item, storeData?.menu_all)}
                              onClick={() => closeSearch()}
                            >
                              <h6>{item?.title || item?.name}</h6>
                            </Link>
                            <PriceParties product={item} />
                          </div>
                          {item?.cart_visibility === 1 && (
                            <div className="product-box">
                              <CardBtn
                                product={item}
                                style="counter"
                                className="px-3"
                              />
                            </div>
                          )}
                        </div>
                      </Col>
                    )
                  )}
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
