import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { ShopProps } from "./core/type";
import FilterPage from "./common/filter";
import ProductList from "./common/productList";

const LeftSidebar = ({ response }: ShopProps) => {
  const [sidebarView, setSidebarView] = useState(false);

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };
  return (
    <section className="section-b-space ratio_asos">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <FilterPage
              sm="3"
              sidebarView={sidebarView}
              closeSidebar={() => openCloseSidebar()}
              response={response}
            />
            <ProductList
              colClass="col-xl-3 col-6 col-grid-box"
              layoutList=""
              openSidebar={() => openCloseSidebar()}
              response={response}
            />
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default LeftSidebar;
