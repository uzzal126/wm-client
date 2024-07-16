import React from "react";
import ProductTab from "./common/product-tab";
import ProductSection from "./common/product_section";
import OutsideImagePage from "./product/imageOutsidePage";

const ThumbnailOutside = () => {
  return (
    <>
      <OutsideImagePage />
      <ProductTab additional_info={null} product={null}/>
      <ProductSection data={null}/>
    </>
  );
};

export default ThumbnailOutside;
