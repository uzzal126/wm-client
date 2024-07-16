import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductSection from "./common/product_section";
import RightSidebarPage from "./product/rightSidebarPage";

type Props = {
  data: any;
};

const RightSidebar: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  return (
    <>
      <RightSidebarPage product={data} />
      {!storeData?.data?.general_settings?.product_page?.related && (
        <ProductSection data={data} />
      )}
    </>
  );
};

export default RightSidebar;
