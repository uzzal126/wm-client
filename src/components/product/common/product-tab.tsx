import { FC, useState } from "react";
import { useSelector } from "react-redux";
import {
  Col,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import NewLightBox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";

import { RatingMake } from "@/components/widgets/product-box/includes/parties";
import { youtube_parser } from "@/helpers/misc";
import PageViewer from "../../../libs/pageBuilder/pageViewer";

const defaultImage = "https://dummyimage.com/600x620/cfcfcf/fff";

type Props = {
  additional_info: any;
  product: any;
};

const ProductTab: FC<Props> = ({ additional_info, product }) => {
  let storeData = useSelector(selectStoreData);
  const [activeTab, setActiveTab] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="m-0 tab-product">
      <Row>
        <Col sm="12" lg="12">
          <Row className="m-0 product-page-main mb-4">
            <Nav tabs className="nav-material" style={{ display: "flex" }}>
              {additional_info?.length > 0 &&
                additional_info?.map((item: any, indx: any) => (
                  <NavItem
                    className="nav nav-tabs"
                    id="myTab1"
                    role="tablist"
                    key={indx}
                  >
                    <NavLink
                      className={activeTab === indx ? "active" : ""}
                      onClick={() => setActiveTab(indx)}
                    >
                      {item?.label}
                    </NavLink>
                  </NavItem>
                ))}
              <NavItem className="nav nav-tabs" id="myTab4" role="tablist">
                <NavLink
                  className={
                    activeTab === (additional_info?.length || 0) ? "active" : ""
                  }
                  onClick={() => {
                    setActiveTab(additional_info?.length || 0);
                  }}
                >
                  Gallery
                </NavLink>
              </NavItem>
              {!storeData?.data?.general_settings?.product_page?.review && (
                <NavItem className="nav nav-tabs" id="myTab5" role="tablist">
                  <NavLink
                    className={
                      activeTab === (additional_info?.length + 1 || 1)
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(additional_info?.length + 1 || 1)
                    }
                  >
                    Reviews
                  </NavLink>
                </NavItem>
              )}
            </Nav>
            <TabContent
              activeTab={activeTab}
              className="nav-material"
              style={{
                overflow: "hidden",
                overflowX: "auto",
                width: "100%",
                height: "100%",
              }}
            >
              {additional_info?.length > 0 &&
                additional_info?.map((item: any, indx: any) => (
                  <TabPane tabId={indx} key={indx}>
                    {/* <div dangerouslySetInnerHTML={{__html: item?.value}}/> */}
                    <div className="my-2">
                      <PageViewer value={item?.body} />
                    </div>
                  </TabPane>
                ))}
              <TabPane tabId={additional_info?.length || 0}>
                <Row>
                  {product &&
                    product?.gallery &&
                    Array.isArray(product?.gallery) &&
                    product?.gallery?.map((item: any, indx: any) => (
                      <Col md={3} className="overflow-hidden" key={indx}>
                        <div className="imageGallery fashion">
                          <div className="overlay">
                            <div className="border-portfolio">
                              <>
                                <div
                                  style={{ cursor: "pointer" }}
                                  className="overlay-background"
                                  onClick={() => {
                                    setActiveTab(additional_info?.length || 0);
                                    setIsOpen(true);
                                    setPhotoIndex(indx);
                                  }}
                                >
                                  <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                                <Media
                                  src={item?.src || defaultImage}
                                  className="img-fluid blur-up lazyload bg-img"
                                />
                              </>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  {isOpen && (
                    <>
                      <NewLightBox
                        index={photoIndex}
                        open={isOpen}
                        close={() => setIsOpen(false)}
                        slides={product?.gallery}
                        plugins={[Counter, Zoom, Thumbnails]}
                        counter={{
                          container: {
                            style: {
                              top: 0,
                              color: "white",
                            },
                          },
                        }}
                      />
                    </>
                  )}
                  {product?.video &&
                    product?.video.src &&
                    product?.video.src.length !== 0 && (
                      <iframe
                        src={`https://youtube.com/embed/${youtube_parser(
                          product?.video?.src
                        )}`}
                        allowFullScreen
                        width="100%"
                        height="500px"
                      ></iframe>
                    )}
                </Row>
              </TabPane>
              {!storeData?.data?.general_settings?.product_page?.review && (
                <TabPane tabId={additional_info?.length + 1 || 1}>
                  {/* <Review /> */}

                  <div className="mt-4 p-3">
                    {product.customer_review &&
                    product.customer_review.length > 0 ? (
                      <div className="card">
                        {product.customer_review.map((review: any) => (
                          <div className="review-card" key={review.review_id}>
                            <div className="d-flex align-items-center">
                              <RatingMake total={review.rating} />
                              <h6 className="mb-0 ml-2 text-capitalize">
                                {review.customer_name}
                              </h6>
                            </div>
                            <h6 className="mb-0" style={{ color: "black" }}>
                              {review.comment}
                            </h6>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <h3>No reviews found!</h3>
                    )}
                  </div>
                </TabPane>
              )}
            </TabContent>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default ProductTab;
