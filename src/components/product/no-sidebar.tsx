import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductSection from "./common/product_section";
import NoSidebarPage from "./product/noSidebarPage";
type Props = {
  data: any;
};

const NoSidebar: FC<Props> = ({ data }) => {
  const id = "1";
  let storeData = useSelector(selectStoreData);
  return (
    <>
      <NoSidebarPage product={data} />
      {!storeData?.data?.general_settings?.product_page?.related && (
        <ProductSection data={data} />
      )}
    </>
  );
};

export default NoSidebar;
