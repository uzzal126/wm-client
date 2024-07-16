import React, { FC } from "react";
import { Container, Row, Col } from "reactstrap";
import CountdownTimer from "../../../helpers/countdown-component/countdown";
import { imageDimentionHelper } from "../../../helpers/misc";

const banner = "https://dummyimage.com/1920x300/d1d1d1/222";
const mb = "https://dummyimage.com/1280x420/d1d1d1/222";
type Props = {
  data: any;
};
const FullBanner2: FC<Props> = ({ data }) => {
  const dImage = imageDimentionHelper(
    data?.list[0]?.banner_url,
    1920,
    300,
    true
  );
  const mImage = imageDimentionHelper(
    data?.list[0]?.mobile_banner_url,
    1280,
    420,
    true
  );
  return (
    <div className="game-banner">
      <Container>
        <div className="position-relative">
          <div>
            <img
              src={dImage ? data?.list[0]?.banner_url : banner}
              alt=""
              className="img-fluid d-none d-md-block"
            />
            <img
              src={mImage ? data?.list[0]?.mobile_banner_url : mb}
              alt=""
              className="img-fluid d-block d-md-none"
            />
          </div>
          <Row
            className="banner-timer align-items-center position-absolute top-50 start-0 translate-middle-y"
            style={{ backgroundImage: "none", width: "100%" }}>
            <Col md="6">
              <div className="banner-text">
                <div
                  className="py-3"
                  dangerouslySetInnerHTML={{
                    __html: data?.list[0]?.editor || "",
                  }}></div>
              </div>
            </Col>
            <Col md="6">
              <CountdownTimer
                time={data?.list[0]?.coundown || "2022-12-31 03:20:00"}
              />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export { FullBanner2 };
