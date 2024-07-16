import { useEffect, useState } from "react";
import { Card, CardHeader, Col, Collapse, Row } from "reactstrap";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import {
  CompareBtn,
  WishlistBtn,
} from "../../widgets/product-box/includes/btns";
import { RatingMake } from "../../widgets/product-box/includes/parties";
import MasterSocial from "./master_social";
import VariantTable from "./variableTable";

const ProductAccordion = ({ item, variant }: { variant: any; item: any }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="product-right product-description-box">
      <h2>{item?.name}</h2>

      <div className="product-icon mb-3">
        <RatingMake total={item?.rating?.avg} />
      </div>
      <div className="product-icon mb-3">
        <MasterSocial
          categories={item.categories}
          image={item.thumbnail?.src}
          name={item.name}
          url={`product/${item?.slug}`}
        />
        <form className="d-flex align-items-center ml-2">
          <WishlistBtn product={item} className="wishlist-btn" />
          <div className="ml-3">
            <CompareBtn product={item} />
          </div>
        </form>
      </div>
      <Row className="product-accordion">
        <Col sm="12">
          <div className="accordion theme-accordion" id="Productaccordion">
            <Card>
              <CardHeader className="card-header" id="headingOne">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    product description
                  </button>
                </h5>
              </CardHeader>
              {loaded && (
                <Collapse
                  isOpen={isOpen}
                  id="collapseOne"
                  className="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#Productaccordion"
                >
                  <div className="card-body">
                    <>
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
                    </>
                    <div className="single-product-tables detail-section">
                      <VariantTable variant={variant} />
                    </div>
                  </div>
                </Collapse>
              )}
            </Card>
            {
              // item?.additional_info && item?.additional_info.length > 0 && item?.additional_info.map((item: any, i: any) => (
              //   <Card className="card" key={i}>
              //     <CardHeader className="card-header" id="headingThree">
              //       <h5 className="mb-0">
              //         <button
              //           className="btn btn-link collapsed"
              //           type="button"
              //           data-toggle="collapse"
              //           data-target={`#collapseThree${i}`}
              //           aria-expanded="false"
              //           onClick={() => setActiveTab(i)}
              //           aria-controls={`collapseThree${i}`}
              //         >
              //           {item.label}
              //         </button>
              //       </h5>
              //     </CardHeader>
              //     <Collapse
              //       isOpen={activeTab === i}
              //       id={`collapseThree${i}`}
              //       className="collapse"
              //       aria-labelledby="headingThree"
              //       data-parent="#Productaccordion"
              //     >
              //       <CardBody className="card-body">
              //         <PageViewer value={item?.body} />
              //       </CardBody>
              //     </Collapse>
              //   </Card>
              // ))
            }
            {/* <Card className="card">
              <CardHeader className="card-header" id="headingTwo">
                <h5 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    onClick={toggleDetail}
                    aria-controls="collapseTwo"
                  >
                    Gallery
                  </button>
                </h5>
              </CardHeader>
              <Collapse
                isOpen={isDetail}
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#Productaccordion"
              >
                <CardBody>
                  <Row>
                    {item &&
                      item?.gallery &&
                      Array.isArray(item?.gallery) &&
                      item?.gallery?.map((item: any, indx: any) => (
                        <Col md={4} className="overflow-hidden">
                          <div className="imageGallery fashion">
                            <div className="overlay">
                              <div className="border-portfolio">
                                <>
                                  <div
                                    style={{ cursor: "pointer" }}
                                    className="overlay-background"
                                    onClick={() => {
                                      setLightbox(true);
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
                    {lightbox && (
                      <>
                        <NewLightBox
                          index={photoIndex}
                          open={lightbox}
                          close={() => setLightbox(false)}
                          slides={item?.gallery}
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
                  </Row>
                </CardBody>
              </Collapse>
            </Card>
            {
              !storeData?.data?.general_settings?.product_page?.review && (
                <Card className="card">
                  <CardHeader className="card-header" id="headingThree">
                    <h5 className="mb-0">
                      <button
                        className="btn btn-link collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        onClick={toggleReview}
                        aria-controls="collapseThree"
                      >
                        review
                      </button>
                    </h5>
                  </CardHeader>
                  <Collapse
                    isOpen={isReview}
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#Productaccordion"
                  >
                    <CardBody className="card-body">
                      <p>no reviews yet</p>
                    </CardBody>
                  </Collapse>
                </Card>
              )
            } */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductAccordion;
