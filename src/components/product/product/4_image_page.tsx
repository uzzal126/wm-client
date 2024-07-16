import React from "react";
import { Col, Container, Row } from "reactstrap";
import ProductTab from "../common/product-tab";
import DetailsWithPrice from "../common/detail-price";

const imageOne = "/assets/images/fashion/pro/001.jpg";
const imgData = [imageOne, imageOne, imageOne, imageOne];

const FourImagePage = ({ product }: { product: any }) => {
  return (
    <section>
      <div className="collection-wrapper ratio_asos">
        <Container>
          <Row>
            <Col lg="6">
              <Row className="product_image_4">
                {product?.variants && product?.variants?.length > 3
                  ? product?.variants?.map((item: any, index: number) => (
                      <Col xs="6" key={index}>
                        <div>
                          <img
                            src={item?.thumbnail}
                            alt=""
                            className="img-fluid blur-up lazyload bg-img"
                          />
                        </div>
                      </Col>
                    ))
                  : imgData.map((img, index) => {
                      return (
                        <Col xs="6" key={index}>
                          <div>
                            <img
                              src={
                                index < product?.variants?.length
                                  ? product?.variants[index]?.thumbnail
                                  : img
                              }
                              alt=""
                              className="img-fluid blur-up lazyload bg-img"
                            />
                          </div>
                        </Col>
                      );
                    })}
              </Row>
            </Col>
            <Col lg="6" className="rtl-text">
              <DetailsWithPrice item={product} />
            </Col>
          </Row>
          <ProductTab
            additional_info={product?.additional_info || []}
            product={product}
          />
        </Container>
      </div>
    </section>
  );
};

export default FourImagePage;
