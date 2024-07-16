import useDeviceSize from "@/helpers/utils/hooks/resizeHandler";
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CompHelper from "../helpers/CompHelper";
import TopBottomComHelper from "../helpers/topBottomComHelper";
import CopyRight from "./common/copyright";

const FooterFive = ({ data, layoutClass }: any) => {
  const [isOpen, setIsOpen] = useState<any>();
  const [collapse, setCollapse] = useState<any>(0);
  const { width } = useDeviceSize();
  useEffect(() => {
    const changeCollapse = () => {
      if (width < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener("resize", changeCollapse);
    };
  }, []);
  return (
    <Fragment>
      <footer className="jewel-footer">
        <div className="white-layout">
          <section className="p-0 ">
            <Container fluid={true}>
              <Row className="footer-theme2 section-light footer-border">
                <Col>
                  <div className="footer-block position-relative ">
                    <div className="footer-container">
                      <CompHelper
                        className="footer-mobile-title"
                        isOpen={true}
                        collapse={true}
                        setIsOpen={null}
                        setCollapse={null}
                        data={data?.body?.column1}
                        newsletterClass="subscribe-white"
                        socialClass="social-white justify-content-center"
                      />
                    </div>
                  </div>
                </Col>
                <Col className="p-0 form-p">
                  <div className="footer-block position-relative ">
                    <CompHelper
                      isOpen={true}
                      collapse={true}
                      setIsOpen={null}
                      setCollapse={null}
                      data={data?.body?.column2}
                      newsletterClass="subscribe-white"
                      socialClass="social-white justify-content-center"
                      locationList={true}
                    />
                  </div>
                </Col>
                <Col>
                  <div className=" footer-block position-relative">
                    <div className="footer-container">
                      <CompHelper
                        isOpen={true}
                        collapse={true}
                        setIsOpen={null}
                        setCollapse={null}
                        data={data?.body?.column3}
                        newsletterClass="subscribe-white"
                        socialClass="social-white justify-content-center"
                        locationList={true}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
        <div className="white-layout box-layout">
          <Container>
            <section className="small-section">
              <Row className="footer-theme2 position-relative ">
                <Col>
                  <TopBottomComHelper
                    titleClass="py-2"
                    linkClass="link-white"
                    socialClass="social-white my-1"
                    data={data?.body?.bottom || {}}
                  />
                </Col>
              </Row>
            </section>
          </Container>
        </div>
        <CopyRight data={data?.body} layout={layoutClass} />
      </footer>
    </Fragment>
  );
};

export default FooterFive;
