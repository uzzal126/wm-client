import React from "react";
import ProductList from "./common/productList";
import { Container, Row } from "react-bootstrap";
import { ShopProps } from "./core/type";

const NoSidebar = ({ response }: ShopProps) => {
  return (
    <section className="section-b-space ratio_asos">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <ProductList
              colClass="col-xl-3 col-6 col-grid-box"
              noSidebar={true}
              response={response}
            />
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default NoSidebar;
