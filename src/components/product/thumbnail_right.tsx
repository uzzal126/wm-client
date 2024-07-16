import React from "react";
import ProductTab from "./common/product-tab";
import ProductSection from "./common/product_section";
import RightImagePage from "./product/rightImagePage";

const ThumbnailRight = () => {
  return (
    <>
      <RightImagePage />
      <ProductTab additional_info={null} product={null}/>
      <ProductSection data={null}/>
    </>
  );
};

export default ThumbnailRight;
