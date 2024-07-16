import React from "react";
import { Row, Container, Col } from "reactstrap";
import { ProductCollection12 } from "../Collections";

const FullWidth = () => {
  return (
    <Container fluid={true}>
      <Row>
        <Col sm="12">
          <ProductCollection12 data={{}} col="full" />
        </Col>
      </Row>
    </Container>
  );
};

export default FullWidth;
