import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ShopProps } from "../core/type";
import Brand from "./brand";
import Category from "./category";
import Price from "./price";
import Variants from "./variants";

interface FilterType extends ShopProps {
  sm?: any;
  sidebarView: any;
  closeSidebar: any;
}

const FilterPage = ({ sm, sidebarView, closeSidebar }: FilterType) => {
  let storeData = useSelector(selectStoreData);
  let shopData = storeData?.data?.general_settings?.shop_page?.body;
  const filterConfig: any = shopData
    ? shopData[
        Object?.keys(shopData || {})?.filter((f) => f.includes("filter"))[0]
      ]
    : null;

  return (
    <>
      <Col
        sm={sm}
        className="collection-filter"
        style={sidebarView ? { left: "0px" } : {}}
      >
        <div className="collection-filter-block">
          <div
            className="collection-mobile-back"
            onClick={() => closeSidebar()}
          >
            <span className="filter-back">
              <i className="fa fa-angle-left" aria-hidden="true"></i> back
            </span>
          </div>
          {!filterConfig && (
            <>
              <Price />
              <Category />
              <Brand />
              <Variants />
            </>
          )}
          {filterConfig?.filter_by?.length === 0 && (
            <>
              <Price />
              <Category />
              <Brand />
              <Variants />
            </>
          )}
          {filterConfig?.filter_by?.length !== 0 &&
            filterConfig?.filter_by?.includes("price-range") && <Price />}

          {filterConfig?.filter_by?.length !== 0 &&
            filterConfig?.filter_by?.includes("categories") && <Category />}

          {filterConfig?.filter_by?.length !== 0 &&
            filterConfig?.filter_by?.includes("brands") && <Brand />}

          {filterConfig?.filter_by?.length !== 0 &&
            filterConfig?.filter_by?.includes("variants") && <Variants />}
        </div>
      </Col>
    </>
  );
};

export default FilterPage;
