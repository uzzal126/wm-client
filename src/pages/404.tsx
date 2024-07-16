import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const Page404 = () => {
  return (
    <section className="p-0">
      <Container>
        <Row>
          <Col sm="12">
            <div className="error-section">
              <h1>404</h1>
              <h2>page not found</h2>
              <Link href="/" className="btn btn-solid">
                back to home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Page404;
