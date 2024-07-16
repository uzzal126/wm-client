import { CardBtn } from "@/components/widgets/product-box/includes/btns";
import { PriceParties } from "@/components/widgets/product-box/includes/parties";
import { CompareContext } from "@/contexts/Compare/CompareContext";
import { ImageHelper } from "@/helpers/lazy-load-image/image-lazy-load";
import Page404 from "@/pages/404";
import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";

const dummy_image = "https://dummyimage.com/600x620/d4d4d4/6b6a6b.jpg";

const Compare = () => {
  let storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const contextCompare: any = useContext(CompareContext);

  const compareItem: any = contextCompare.compareItems;

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`Product Comparison`}</title>
        <meta name="description" content={data?.seo?.description} />
        <meta name="keywords" content={data?.seo?.keywords} />
        <meta name="author" content={data?.store_info?.domain} />
        <meta name="copyright" content={data?.store_info?.business_name} />
        <meta name="robots" content="index,nofollow" />
        <link
          rel="icon"
          type="image/x-icon"
          href={data?.logo?.fav_logo ? data?.logo?.fav_logo : ""}
        />
      </Head>
      <section className="compare-padding">
        <Container>
          <Row>
            <Col sm="12">
              {compareItem.length >= 0 ? (
                <div className="compare-page">
                  <div className="table-wrapper table-responsive">
                    <Table className="table">
                      <thead>
                        <tr className="th-compare">
                          <td>Action</td>
                          {compareItem &&
                            compareItem.length > 0 &&
                            compareItem.map((item: any, i: any) => (
                              <th className="item-row" key={i}>
                                <button
                                  type="button"
                                  className="remove-compare"
                                  style={{
                                    color: "red",
                                    background: "#f7d2db",
                                    padding: 8,
                                    borderRadius: 5,
                                  }}
                                  onClick={() =>
                                    contextCompare.removeFromComapre(item)
                                  }
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                    style={{ marginRight: 7 }}
                                  ></i>
                                  Remove
                                </button>
                              </th>
                            ))}
                        </tr>
                      </thead>
                      <tbody id="table-compare">
                        <tr>
                          <th className="product-name">Product Name</th>
                          {compareItem &&
                            compareItem.length > 0 &&
                            compareItem.map((item: any, i: any) => (
                              <td
                                className="grid-link__title"
                                key={i}
                                style={{ fontWeight: 500 }}
                              >
                                {item?.name || item?.title}
                              </td>
                            ))}
                        </tr>
                        <tr>
                          <th className="product-name">Product Image</th>
                          {compareItem &&
                            compareItem.length > 0 &&
                            compareItem.map((item: any, i: any) => (
                              <td className="item-row" key={i}>
                                <Link href={`/product/${item?.slug}`}>
                                  <img
                                    src={item?.thumbnail?.src || dummy_image}
                                    alt=""
                                    className="featured-image"
                                  />
                                </Link>
                                <div
                                  style={{ marginTop: 10, marginBottom: 10 }}
                                >
                                  <PriceParties product={item} />
                                  <CardBtn
                                    product={item}
                                    style={
                                      window.innerWidth < 600
                                        ? "icon"
                                        : "outline"
                                    }
                                  />
                                </div>

                                <p className="grid-link__title hidden">
                                  {item?.name || item?.title}
                                </p>
                              </td>
                            ))}
                        </tr>
                        <tr>
                          <th className="product-name">Product Description</th>
                          {compareItem.map((item: any, i: any) => (
                            <td className="item-row" key={i}>
                              <p>
                                {item?.description.includes("%") ||
                                item?.description.includes("//") ||
                                item?.description.includes("/\\/") ? (
                                  <div
                                    className="sort-dest"
                                    dangerouslySetInnerHTML={{
                                      __html: unescape(item?.description),
                                    }}
                                  />
                                ) : (
                                  <div
                                    className="sort-dest"
                                    dangerouslySetInnerHTML={{
                                      __html: item?.description,
                                    }}
                                  />
                                )}
                              </p>
                            </td>
                          ))}
                        </tr>
                        <tr>
                          <th className="product-name">Availability</th>
                          {compareItem.map((item: any, i: any) => (
                            <td className="available-stock" key={i}>
                              <p>
                                {item.stock >= 0
                                  ? "Not Available"
                                  : "Available"}
                              </p>
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
              ) : (
                <section className="cart-section section-b-space">
                  <Container>
                    <Row>
                      <Col sm="12">
                        <div>
                          <Col sm="12" className="empty-cart-cls text-center">
                            <ImageHelper
                              src={`/assets/images/icon-empty-cart.png`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>No Products Found!</strong>
                            </h3>
                            <h4>Explore more shortlist some items.</h4>
                          </Col>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </section>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Compare;
