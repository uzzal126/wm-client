import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSelector } from "react-redux";
import LeftSidebar from "./leftSidebar";
import MiddleContent from "./middleContent";
import RightSidebar from "./rightSidebar";
import TopSection from "./topSection";

const Blog1 = () => {
  let storeData = useSelector(selectStoreData);
  let themeInfo = storeData?.data?.theme_info;
  const column =
    themeInfo?.left_section && themeInfo?.right_section
      ? "6"
      : themeInfo?.left_section && !themeInfo?.right_section
      ? "9"
      : !themeInfo?.left_section && themeInfo?.right_section
      ? "9"
      : "12";

  return (
    <div className="blog-page blog-theme-1">
      <div>
        <TopSection data={themeInfo?.top_section} />
      </div>
      <div className="container">
        <div className="row">
          <div className={`col-lg-${column} order-0 order-lg-1`}>
            <MiddleContent data={themeInfo?.middle_section} />
          </div>
          {themeInfo?.left_section && (
            <div className="order-1 order-lg-0 col-lg-3">
              <LeftSidebar data={themeInfo?.left_section} />
            </div>
          )}
          {themeInfo?.right_section && (
            <div className="order-2 col-lg-3">
              <RightSidebar data={themeInfo?.right_section} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog1;
