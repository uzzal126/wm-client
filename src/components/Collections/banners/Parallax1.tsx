import React, { FC, Fragment } from "react";
import { imageDimentionHelper } from "../../../helpers/misc";
import MasterParallaxBanner from "./components/MasterParallaxBanner";

const banner = "https://dummyimage.com/1920x1080/d1d1d1/222";
type Props = {
  data: any;
};
const Parallax1: FC<Props> = ({ data }) => {
  const dImage = imageDimentionHelper(
    data?.list[0]?.banner_url,
    1920,
    1080,
    true
  );
  return (
    <Fragment>
      <MasterParallaxBanner
        bg={dImage ? data?.list[0]?.banner_url : banner}
        parallaxClass="text-center p-left"
        title={data?.list[0]?.subtitle || ""}
        subTitle1={data?.list[0]?.title || ""}
        subTitle2={data?.list[0]?.details || ""}
      />
    </Fragment>
  );
};

export { Parallax1 };
