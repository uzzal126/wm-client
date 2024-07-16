import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useRouter } from "next/router";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProductList from "./common/productList";

export default function CategoryBlock({
  category,
  subItems,
  layoutType = "",
}: any) {
  const router = useRouter();
  const { slug, search } = router.query;
  const [selectedCategory, setSelectedCategory] = useState(category);
  let storeData = useSelector(selectStoreData);
  const handleCategoryClick = (item: any) => {
    const cat = storeData?.menu_all?.filter((e: any) => item?.id === e?.id);
    setSelectedCategory(item);

    if (cat?.length > 0) {
      router.push(`/category/${cat[0]?.url}`);
    }
  };
  return (
    <>
      <Nav
        variant="pills"
        className="flow-scroll"
        style={{ margin: "4px", padding: "4px 4px 15px" }}
      >
        {subItems?.length > 0 &&
          subItems?.map((item: any, indx: any) => (
            <Nav.Item key={indx} onClick={() => handleCategoryClick(item)}>
              <Nav.Link
                className={`border border-primary mr-2 ${
                  slug === item?.url || item === selectedCategory
                    ? "active"
                    : ""
                }`}
              >
                {item?.title}
              </Nav.Link>
            </Nav.Item>
          ))}
      </Nav>
      <ProductList
        colClass="col-lg-4 col-6 col-grid-box"
        layoutList=""
        noSidebar={true}
        layoutType={layoutType}
        response={{
          category: null,
          data: null,
          payload: null,
          isLoading: false,
        }}
      />
    </>
  );
}
