import React from "react";
import StickyPage from "./product/sticky_page";
import ProductSection from "./common/product_section";
import ProductTab from "./common/product-tab";

const Sticky = () => {
  return (
    <>
      <StickyPage />
      <ProductTab additional_info={null} product={null}/>
      <ProductSection data={null}/>
    </>
  );
};

export default Sticky;
