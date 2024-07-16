import { Col, Container, Row } from "reactstrap";
import DetailsMinimal from "../common/detail-minimal";
import ImageZoom from "../common/image-zoom";
import ProductTab from "../common/product-tab";

const MinimalPage = ({ product }: { product: any }) => {
  return (
    <section className="pt-0">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="12" xs="12">
              <div className="container-fluid">
                <Row className="align-items-center mt-5">
                  <Col lg="5" className="product-thumbnail">
                    <ImageZoom
                      image={
                        product?.thumbnail?.src ||
                        "https://dummyimage.com/600x620/cfcfcf/fff"
                      }
                    />
                  </Col>
                  <Col lg="7" className="rtl-text">
                    <DetailsMinimal product={product} />
                  </Col>
                </Row>
              </div>
              <ProductTab
                additional_info={product?.additional_info || []}
                product={product}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default MinimalPage;
