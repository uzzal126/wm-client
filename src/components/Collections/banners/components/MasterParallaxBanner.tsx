import React, { FC, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";

type Props = {
  bg: any;
  parallaxClass: any;
  title: any;
  subTitle1: any;
  subTitle2: any;
  parallaxSectionClass?: any;
};

const MasterParallaxBanner: FC<Props> = ({
  parallaxSectionClass,
  bg,
  parallaxClass,
  title,
  subTitle1,
  subTitle2,
}) => {
  return (
    <Fragment>
      <section className={`p-0 ${parallaxSectionClass}`}>
        <div
          className={`full-banner parallax ${parallaxClass}`}
          style={{ backgroundImage: `url(${bg})` }}>
          <Container>
            <Row>
              <Col>
                <div className="banner-contain">
                  <h2>{title}</h2>
                  <h3>{subTitle1}</h3>
                  <h4>{subTitle2}</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Fragment>
  );
};

export default MasterParallaxBanner;
