import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductSection from "./common/product_section";
import LeftSidebarPage from "./product/leftSidebarPage";
type Props = {
  data: any;
};

const LeftSidebar: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);

  return (
    <>
      <LeftSidebarPage product={data} />
      {!storeData?.data?.general_settings?.product_page?.related && (
        <ProductSection data={data} />
      )}
    </>
  );
};

export default LeftSidebar;
