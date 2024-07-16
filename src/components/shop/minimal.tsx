import { useFilter } from "@/contexts/filter/FilterProvider";
import { ImageHelper } from "@/helpers/lazy-load-image/image-lazy-load";
import { getCategoryObject, makeSet } from "@/helpers/misc";
import { selectStoreData } from "@/redux-handler/reducers/storeDataReducer";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CategoryBlock from "./category-block";
import { ShopProps } from "./core/type";

const Minimal = ({ response }: ShopProps) => {
  const router = useRouter();
  const { slug } = router.query;
  const searchParams = useSearchParams();

  let storeData = useSelector(selectStoreData);
  const layers = storeData?.menu_list?.filter((e: any) => e?.parent_id === 0);
  const category = storeData?.menu_list?.filter((e: any) => e?.url === slug)[0];
  const categoryObj: any = getCategoryObject(layers, storeData?.menu_list);

  const getLayerCategories = (item: any) => {
    if (Object.keys(categoryObj)?.length > 0) {
      const keys = Object.keys(categoryObj);
      for (let i = 0; i < keys?.length; i++) {
        const key = keys[i];
        if (key === item?.url) {
          return [...categoryObj[key]];
        }
      }
    } else {
      return [{ ...item }];
    }
  };
  const getRoot = (item: any) => {
    if (Object.keys(categoryObj)?.length > 0) {
      const keys = Object.keys(categoryObj);
      for (let i = 0; i < keys?.length; i++) {
        const key = keys[i];
        const list = categoryObj[key];
        const ar = list?.filter((e: any) => e?.id === item?.id);
        if (ar?.length > 0) {
          return categoryObj[key][0];
        }
      }
    } else {
      return { ...item };
    }
  };

  const getLayerSub = (item: any) => {
    const list = [];
    // enlisting subcategory of item layer - 1
    for (let i = 0; i < storeData?.menu_list?.length; i++) {
      if (
        item?.id === storeData?.menu_list[i]?.parent_id ||
        item?.id === storeData?.menu_list[i]?.id
      ) {
        list.push(storeData?.menu_list[i]);
      }
    }
    // enlisting parent of item layer - 1
    for (let i = 0; i < storeData?.menu_list?.length; i++) {
      if (item?.parent_id === storeData?.menu_list[i]?.id) {
        list.push(storeData?.menu_list[i]);
      }
    }

    // enlisting subcategory of item layer - 2
    for (let i = 0; i < list.length; i++) {
      const item: any = list[i];
      for (let j = 0; j < storeData?.menu_list?.length; j++) {
        if (item?.parent_id === storeData?.menu_list[i]?.id) {
          list.push(storeData?.menu_list[j]);
        }
      }
    }
    // enlisting parent of item layer - 2
    for (let i = 0; i < list.length; i++) {
      const item: any = list[i];
      for (let j = 0; j < storeData?.menu_list?.length; j++) {
        if (item?.id === storeData?.menu_list[i]?.parent_id) {
          list.push(storeData?.menu_list[j]);
        }
      }
    }
    // enlisting subcategory of item layer - 3
    for (let i = 0; i < list.length; i++) {
      const item: any = list[i];
      for (let j = 0; j < storeData?.menu_list?.length; j++) {
        if (item?.parent_id === storeData?.menu_list[i]?.id) {
          list.push(storeData?.menu_list[j]);
        }
      }
    }
    // enlisting parent of item layer - 3
    for (let i = 0; i < list.length; i++) {
      const item: any = list[i];
      for (let j = 0; j < storeData?.menu_list?.length; j++) {
        if (item?.id === storeData?.menu_list[i]?.parent_id) {
          list.push(storeData?.menu_list[j]);
        }
      }
    }

    return makeSet(list)?.sort((a, b) =>
      a.id > b.id ? 1 : a.id < b.id ? -1 : 0
    );
  };

  const { search } = useFilter();

  return (
    <section className="py-0 ratio_asos">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col className="collection-content">
              <div className="page-main-content">
                <Row>
                  <Col sm="12">
                    <div className="top-banner-wrapper">
                      <a>
                        {response?.category?.image && (
                          <ImageHelper
                            src={response?.category?.image}
                            className="img-fluid blur-up lazyload"
                            alt=""
                          />
                        )}
                      </a>
                    </div>
                    {search && (
                      <>
                        <h4
                          style={{ textTransform: "initial" }}
                        >{`Showing search results for keyword: "${search}"`}</h4>
                        <CategoryBlock
                          category={null}
                          subItems={[]}
                          layoutType="minimal_shop"
                        />
                      </>
                    )}
                    {slug && slug !== "all" ? (
                      <CategoryBlock
                        category={category}
                        subItems={getLayerCategories(getRoot(category))}
                      />
                    ) : !searchParams.get("search") ? (
                      layers &&
                      layers?.length > 0 &&
                      layers?.map((item: any, indx: any) => (
                        <CategoryBlock
                          category={item}
                          subItems={getLayerCategories(getRoot(item))}
                          key={indx}
                        />
                      ))
                    ) : null}
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default Minimal;
