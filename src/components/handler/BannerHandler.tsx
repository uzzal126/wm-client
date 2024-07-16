import React, { FC } from "react";
import {
  FullBanner1,
  FullBanner2,
  HomeBanner1,
  HomeBanner2,
  HomeBanner3,
  HomeBanner4,
  HomeBanner5,
  Parallax1,
} from "../Collections/banners";

type Props = {
  data?: any;
};

const BannerHandler: FC<Props> = ({ data }) => {
  return data && data?.setting ? (
    data?.setting?.template === "banner-gallery-bg-full" ? (
      <HomeBanner1 data={data} />
    ) : data?.setting?.template === "style1-grid" ? (
      <HomeBanner2 data={data} />
    ) : data?.setting?.template === "style2-grid" ? (
      <HomeBanner3 data={data} />
    ) : data?.setting?.template === "hover1-grid-slider" ? (
      <HomeBanner4 data={data} />
    ) : data?.setting?.template === "hover-grid-slider" ? (
      <HomeBanner5 data={data} />
    ) : data?.setting?.template === "simple-bg-full" ? (
      <FullBanner1 data={data} />
    ) : data?.setting?.template === "simple-coundown-bg-full" ? (
      <FullBanner2 data={data} />
    ) : data?.setting?.template === "parallex-bg-full" ? (
      <Parallax1 data={data} />
    ) : (
      <p className="py-5 text-center text-danger">Please configure again</p>
    )
  ) : null;
};

export default BannerHandler;
