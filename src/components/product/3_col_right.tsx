import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductSection from "./common/product_section";
import ThreeColRightPage from "./product/3_col_right_page";

type Props = {
  data: any;
};

const ThreeColRight: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  return (
    <>
      <ThreeColRightPage product={data} />
      {!storeData?.data?.general_settings?.product_page?.related && (
        <ProductSection data={data} />
      )}
    </>
  );
};

export default ThreeColRight;
