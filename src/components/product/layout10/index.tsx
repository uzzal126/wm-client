import PageViewer from "@/libs/pageBuilder/pageViewer";
import Link from "next/link";
import { useState } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { Media } from "reactstrap";
import NewLightBox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const defaultImage = "https://dummyimage.com/600x620/cfcfcf/fff";

const ProductLayout10 = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <img
                src={data?.thumbnail?.src || defaultImage}
                alt=""
                className="img-fluid"
              />
            </div>
            <div className="col-lg-7">
              <h2>{data.title || data.name}</h2>
              <div className="pt-3">
                <Link
                  href={`/request-for-quotation?prod_id=${data?.prod_id}&name=${data.name}`}
                >
                  <button className="px-5 rounded btn btn-primary">
                    Request A Price
                  </button>
                </Link>
              </div>
              <hr />
              <div className="top-three">
                {data.description.includes("%") ||
                data.description.includes("//") ||
                data.description.includes("/\\/") ? (
                  <div
                    className="sort-dest"
                    dangerouslySetInnerHTML={{
                      __html: unescape(data.description),
                    }}
                  />
                ) : (
                  <div
                    className="sort-dest"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  />
                )}
              </div>
            </div>
          </div>
          {/* end */}
        </div>
      </div>
      {data?.additional_info.length > 0 && (
        <div className="py-3">
          <div className="container">
            <div className="row">
              <div className="col">
                <h3>{data?.additional_info[0].label}</h3>
                <PageViewer value={data?.additional_info[0]?.body} />
              </div>
            </div>
          </div>
        </div>
      )}
      {data?.additional_info.length > 1 && (
        <div className="py-3 bg-light">
          <div className="container">
            <div className="tab-content">
              <Tabs defaultActiveKey="tab0" id="spec-tab" className="mb-3">
                {data?.additional_info
                  ?.slice(1, data?.additional_info.length)
                  .map((item: any, i: any) => (
                    <Tab eventKey={`tab${i}`} title={item.label} key={i}>
                      <PageViewer value={item?.body} />
                    </Tab>
                  ))}
              </Tabs>
            </div>
          </div>
        </div>
      )}
      <div className="py-3">
        <div className="container">
          <div className="text-center">
            <h3>Media Gallery</h3>
          </div>
          <Row>
            {data &&
              data?.gallery &&
              Array.isArray(data?.gallery) &&
              data?.gallery?.map((item: any, indx: any) => (
                <Col md={3} className="overflow-hidden" key={indx}>
                  <div className="imageGallery fashion">
                    <div className="overlay">
                      <div className="border-portfolio">
                        <>
                          <div
                            style={{ cursor: "pointer" }}
                            className="overlay-background"
                            onClick={() => {
                              setActiveTab(data?.additional_info?.length || 0);
                              setIsOpen(true);
                              setPhotoIndex(indx);
                            }}
                          >
                            <i className="fa fa-plus" aria-hidden="true"></i>
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
                  slides={data?.gallery}
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
        </div>
      </div>
    </>
  );
};

export default ProductLayout10;
