import { styleGenerator } from "@/helpers/misc";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import CompHelper from "../../helpers/CompHelper";
import TopBottomComHelper from "../../helpers/topBottomComHelper";
import CopyRight from "./copyright";

const MasterFooter = ({
  data,
  containerFluid,
  layoutClass,
  footerClass,
  footerLayOut,
  footerSection,
  belowSection,
  belowContainerFluid,
  copyRightFluid,
  hideNewsletter,
}: any) => {
  const [isOpen, setIsOpen] = useState<any>(0);
  const [openList, setOpenList] = useState<any>([1]);
  const [collapse, setCollapse] = useState<any>(0);

  let width: any = 0;
  if (typeof window !== "undefined") {
    width = window.innerWidth < 750;
  }

  useEffect(() => {
    const changeCollapse = () => {
      if (window.innerWidth < 750) {
        setCollapse(0);
        setIsOpen(false);
      } else setIsOpen(true);
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
      setOpenList([1, 2, 3, 4]);
    }
  }, [width]);

  return (
    <div>
      <footer className={footerClass}>
        {!hideNewsletter &&
          data?.body?.top?.list &&
          Object.keys(data?.body?.top?.list)?.length > 0 && (
            <div className={footerLayOut}>
              <Container fluid={containerFluid ? containerFluid : ""}>
                <section className={`position-relative ${footerSection}`}>
                  <TopBottomComHelper
                    isOpen={isOpen}
                    collapse={collapse}
                    setIsOpen={setIsOpen}
                    setCollapse={setCollapse}
                    width={width}
                    data={data?.body?.top}
                  />
                </section>
              </Container>
            </div>
          )}

        <section
          className={
            data?.body?.top?.list &&
            Object.keys(data?.body?.top?.list)?.length > 0
              ? belowSection
              : "section-b-space"
          }
          style={{
            ...styleGenerator(data?.styles),
          }}
        >
          <Container fluid={belowContainerFluid ? belowContainerFluid : ""}>
            <Row className="footer-theme partition-f">
              <Col lg="4" md="6" className="position-relative">
                <CompHelper
                  title={true}
                  className="footer-mobile-title"
                  isOpen={openList.indexOf(1) !== -1}
                  collapse={collapse}
                  setIsOpen={setIsOpen}
                  openList={openList}
                  id={1}
                  setOpenList={setOpenList}
                  setCollapse={setCollapse}
                  width={width}
                  data={data?.body?.column1}
                />
              </Col>
              <Col className="offset-xl-1 position-relative">
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
              <Col className="position-relative">
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
              <Col className="position-relative">
                <CompHelper
                  isOpen={openList.indexOf(4) !== -1}
                  collapse={collapse}
                  setIsOpen={setIsOpen}
                  setCollapse={setCollapse}
                  width={width}
                  data={data?.body?.column4}
                  openList={openList}
                  id={4}
                  setOpenList={setOpenList}
                />
              </Col>
            </Row>
          </Container>
        </section>

        <CopyRight
          data={data?.body}
          layout={layoutClass}
          fluid={copyRightFluid ? copyRightFluid : ""}
        />
      </footer>
    </div>
  );
};
export default MasterFooter;
