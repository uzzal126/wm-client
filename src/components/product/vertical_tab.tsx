import ProductSection from "./common/product_section";
import VerticalTabPage from "./product/verticalTabPage";

const VerticalTab = () => {
  return (
    <>
      <VerticalTabPage />
      <ProductSection data={null} />
    </>
  );
};

export default VerticalTab;
