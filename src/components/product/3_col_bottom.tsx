import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ThreeColBottomPage from "./product/3_col_Bottom_page";
import ProductSection from "./common/product_section";

type Props = {
  data: any;
};

const ThreeColBottom: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  return (
    <>
      <ThreeColBottomPage product={data} />
      {!storeData?.data?.general_settings?.product_page?.related && (
        <ProductSection data={data} />
      )}
    </>
  );
};

export default ThreeColBottom;
