import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import MinimalPage from "./product/minimalPage";
import ProductSection from "./common/product_section";
type Props = {
  data: any;
};

const Minimal: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  return (
    <>
      <MinimalPage product={data} />
      {!storeData?.data?.general_settings?.product_page?.related && (
        <ProductSection data={data} />
      )}
    </>
  );
};

export default Minimal;
