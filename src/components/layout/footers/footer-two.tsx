import { Col, Container, Row } from "reactstrap";
import CompHelper from "../helpers/CompHelper";
import CopyRight from "./common/copyright";

const FooterTwo = ({ data, layoutClass }: any) => {
  return (
    <footer className="footer-light pet-layout-footer">
      <div className="white-layout">
        <Container>
          <section className="small-section">
            <Row className="position-relative d-flex flex-column align-items-center">
              <Col>
                <div className="footer-block position-relative ">
                  <div className="footer-container d-flex flex-column align-items-center justify-content-center justify-self-center">
                    <CompHelper
                      className="footer-mobile-title"
                      isOpen={true}
                      footerContentClass={
                        "d-flex flex-column align-items-center justify-content-center justify-self-center"
                      }
                      collapse={true}
                      setIsOpen={null}
                      setCollapse={null}
                      data={data?.body?.bottom}
                      newsletterClass="subscribe-white"
                      socialClass="social-white justify-content-center"
                    />
                  </div>
                </div>
              </Col>
              {/* <Col>
                <TopBottomComHelper
                  titleClass="py-2"
                  linkClass="link-white"
                  socialClass="social-white my-1"
                  data={data?.body?.bottom}
                />
              </Col> */}
            </Row>
          </section>
        </Container>
      </div>
      <CopyRight data={data?.body} layout={layoutClass} />
    </footer>
  );
};

export default FooterTwo;
