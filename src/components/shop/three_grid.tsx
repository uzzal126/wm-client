import React, { useState } from "react";
import { Row, Container } from "reactstrap";
import ProductList from "./common/productList";
// import FilterPage from "./common/filter";

const ThreeGrid = () => {
  const [sidebarView, setSidebarView] = useState(false);
  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  return (
    <section className="section-b-space">
      <Container>
        <Row>
          <ProductList
            colClass="col-lg-4 col-6 col-grid-box"
            layoutList=""
            noSidebar={true}
            response={{
              category: null,
              data: null,
              payload: null,
              isLoading: false,
            }}
          />
        </Row>
      </Container>
    </section>
  );
};

export default ThreeGrid;
