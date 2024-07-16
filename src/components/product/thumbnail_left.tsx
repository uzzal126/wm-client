import React from "react";
import LeftImagePage from "./product/leftImagePage";
import ProductTab from "./common/product-tab";
import ProductSection from "./common/product_section";

const ThumbnailLeft = () => {
  return (
    <>
      <LeftImagePage />
      <ProductTab additional_info={null} product={null}/>
      <ProductSection data={null}/>
    </>
  );
};

export default ThumbnailLeft;
