import React, { FC } from "react";
import { Container } from "reactstrap";
import { imageDimentionHelper } from "../../../helpers/misc";
const banner = "https://dummyimage.com/1920x300/d1d1d1/222";
const mb = "https://dummyimage.com/1280x420/d1d1d1/222";

type Props = {
  data: any;
};

const FullBanner1: FC<Props> = ({ data }) => {
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
    <div className="tools-banner py-2">
      <Container>
        <div className="banner-tools mt-0">
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
        </div>
      </Container>
    </div>
  );
};

export { FullBanner1 };
