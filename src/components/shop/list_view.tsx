import React from "react";
import { Row, Container } from "reactstrap";
import ProductList from "./common/productList";

const ListView = () => {
  return (
    <section className="section-b-space">
      <Container>
        <Row>
          <ProductList
            colClass="col-12"
            layoutList="list-view"
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

export default ListView;
