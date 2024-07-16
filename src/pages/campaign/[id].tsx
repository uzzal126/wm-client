import ProductList from "@/components/campaign/productList";
import SeoHead from "@/components/layout/seo/head";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "reactstrap";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import Page404 from "../404";

export default function SingleCampaignPage() {
  const storeData = useSelector(selectStoreData);
  const { data } = storeData;
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  if (data?.store_info?.store_cat_id === 20) {
    return (
      <div className="py-5">
        <Page404 />
      </div>
    );
  }

  return (
    <>
      <SeoHead
        title={`Campaigns | ${data?.store_info?.site_title}`}
        description={data?.seo?.description}
        keywords={data?.seo?.keywords}
        author={data?.store_info?.domain}
        copyright={data?.store_info?.business_name}
      />
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              {/* <FilterPage
                sm="3"
                sidebarView={sidebarView}
                closeSidebar={() => openCloseSidebar()}
                response={{
                  category: {},
                  data: [],
                  payload: {},
                  isLoading: true,
                }}
              /> */}
              <ProductList
                colClass="col-xl-2 col-6 col-grid-box"
                layoutList=""
                openSidebar={() => openCloseSidebar()}
              />
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}
