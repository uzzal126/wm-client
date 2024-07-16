import AboutMe from "@/components/common/AboutMe/AboutMe";
import { useSelector } from "react-redux";
import { objectSortByKey } from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
import NewProduct from "../../shop/common/newProduct";
import Filter from "../common/filter";
import ImageZoom from "../common/image-zoom";
import Service from "../common/service";

const SidebarHelper = () => {
  let storeData = useSelector(selectStoreData);
  let data = storeData?.data;
  const sectionKey = storeData?.sectionKey;
  let sidebar = data?.general_settings?.product_page?.body;

  sidebar = objectSortByKey(sidebar);

  return (
    <>
      {sidebar &&
        Object.keys(sidebar).length > 0 &&
        Object.keys(sidebar).map((key, i) => {
          let keySplit = key.split("_");

          return (
            <div key={i}>
              {keySplit[0] === sectionKey.TEXT && (
                <div className="collection-filter-block pt-3">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sidebar[key].content,
                    }}
                  ></div>
                </div>
              )}
              {keySplit[0] === sectionKey.IMAGE && (
                <div className="mb-4 rounded overflow-hidden">
                  <ImageZoom image={sidebar[key].url} />
                </div>
              )}
              {keySplit[0] === sectionKey.FILTER && (
                <Filter data={sidebar[key]} />
              )}
              {keySplit[0] === sectionKey.SERVICE && (
                <Service data={sidebar[key]} />
              )}
              {keySplit[0] === sectionKey.PRODUCTGRID && (
                <NewProduct data={sidebar[key]} />
              )}
              {keySplit[0] === sectionKey.ABOUTME && (
                <AboutMe data={sidebar[key]} />
              )}
            </div>
          );
        })}
    </>
  );
};

export default SidebarHelper;
