import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { styleGenerator } from "../../../../helpers/misc";
import CompHelper from "../../helpers/CompHelper";
import TopBottomComHelper from "../../helpers/topBottomComHelper";
import CopyRight from "./copyright";

const MasterFooterTwo = ({
  layoutClass,
  data,
  footerClass,
  footerSection,
}: any) => {
  const [isOpen, setIsOpen] = useState<any>();
  const [collapse, setCollapse] = useState(0);
  const [openList, setOpenList] = useState([1]);
  let width: any = 0;
  if (typeof window !== "undefined") {
    width = window.innerWidth < 750;
  }
  useEffect(() => {
    const changeCollapse = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth < 750) {
          setCollapse(0);
          setIsOpen(false);
          setOpenList([1]);
        } else {
          setIsOpen(true);
          setOpenList([1, 2, 3, 4]);
        }
      }
    };

    window.addEventListener("resize", changeCollapse);

    return () => {
      window.removeEventListener("resize", changeCollapse);
    };
  }, []);

  useEffect(() => {
    if (width) {
      setOpenList([1]);
    } else {
      setOpenList([1, 2, 3]);
    }
  }, [width]);

  return (
    <Fragment>
      <footer
        className={footerClass}
        style={{
          ...styleGenerator(data?.styles),
        }}
      >
        <Container>
          <section
            className={`section-b-space ${
              data?.body?.bottom?.list &&
              Object.keys(data?.body?.bottom?.list).length > 0
                ? footerSection
                : ""
            }`}
          >
            <Row className="footer-theme3">
              <Col lg="3" className="position-relative ">
                <CompHelper
                  title={true}
                  className="footer-mobile-title"
                  isOpen={openList.indexOf(1) !== -1}
                  collapse={collapse}
                  setIsOpen={setIsOpen}
                  setCollapse={setCollapse}
                  width={width}
                  data={data?.body?.column1}
                  openList={openList}
                  id={1}
                  setOpenList={setOpenList}
                />
              </Col>
              <Col lg="6" className="subscribe-wrapper position-relative ">
                <CompHelper
                  isOpen={openList.indexOf(2) !== -1}
                  collapse={collapse}
                  setIsOpen={setIsOpen}
                  setCollapse={setCollapse}
                  width={width}
                  data={data?.body?.column2}
                  openList={openList}
                  id={2}
                  setOpenList={setOpenList}
                />
              </Col>
              <Col lg="3" className="position-relative ">
                <CompHelper
                  isOpen={openList.indexOf(3) !== -1}
                  collapse={collapse}
                  setIsOpen={setIsOpen}
                  setCollapse={setCollapse}
                  width={width}
                  data={data?.body?.column3}
                  openList={openList}
                  id={3}
                  setOpenList={setOpenList}
                />
              </Col>
            </Row>
          </section>
        </Container>

        {data?.body?.bottom?.list &&
          Object.keys(data?.body?.bottom?.list).length > 0 && (
            <Container>
              <section className="py-3 small-section">
                <Row className="footer-theme2 position-relative ">
                  <Col
                    className={`p-set ${
                      data?.body?.bottom?.list &&
                      Object.keys(data?.body?.bottom?.list).length > 0
                        ? ""
                        : "pb-5"
                    }`}
                  >
                    <TopBottomComHelper
                      isOpen={isOpen}
                      collapse={collapse}
                      setIsOpen={setIsOpen}
                      setCollapse={setCollapse}
                      width={width}
                      data={data?.body?.bottom}
                    />
                  </Col>
                </Row>
              </section>
            </Container>
          )}

        <CopyRight data={data?.body} layout={layoutClass ? layoutClass : ""} />
      </footer>
    </Fragment>
  );
};

export default MasterFooterTwo;
