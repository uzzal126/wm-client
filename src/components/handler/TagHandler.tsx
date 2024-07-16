import React, { FC } from "react";
import {
  ProductCollection9,
  ProductTabCollection3,
  ProductCollection8,
} from "../Collections";

type Props = {
  data?: any;
};

const TagHandler: FC<Props> = ({ data }) => {
  return data && data?.setting ? (
    data?.setting?.template === "tag-banner-slider-grid" ? (
      <ProductTabCollection3
        tagCollection={true}
        data={data}
        spanClass={true}
        designClass="tools-grey ratio_square"
      />
    ) : data?.setting?.template === "center-slider-grid" ? (
      <ProductCollection8
        data={data}
        cartClass="cart-box"
        tagCollection={true}
      />
    ) : data?.setting?.template === "style-slider-grid" ? (
      <ProductCollection9 data={data} />
    ) : (
      <p className="py-5 text-center text-danger">Please configure again</p>
    )
  ) : null;
};

export default TagHandler;
