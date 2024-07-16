import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Details from "../common/details";
import ProductTab from "../common/product-tab";
import { GalleryNavigator, ImageGallery } from "../common/gallery";

type Props = {
  product: any;
};

const ThreeColLeftPage = ({ product }: Props) => {
  const [state, setState] = useState({ nav1: null, nav2: null })
  const slider1: any = useRef(null);
  const slider2: any = useRef(null);
  var loading = false;

  const changeColorVar = (img_id: any) => {
    slider2?.current?.slickGoTo(img_id);
  }

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current
    })
  }, [product]);
  const { nav1, nav2 } = state;

  return (
    <section>
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col lg="1" sm="2" xs="12" className="p-0 pb-cls-slider">
              <GalleryNavigator
                images={product?.variants}
                navRef={nav2}
                rootRef={slider2}
                config={{
                  vertical: true,
                  centerMode: false,
                }}
              />
            </Col>
            <Col lg="3" sm="10" xs="12" className="order-up">
              <Row>
                <Col>
                  {slider1 && (
                    <ImageGallery
                      className='"product-right-slick"'
                      images={product?.variants}
                      navRef={nav1}
                      rootRef={slider1}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            <Details data={product} changeImage={changeColorVar}/>
          </Row>
          <ProductTab
            product={product}
            additional_info={product?.additional_info || []}
          />
        </Container>
      </div>
    </section>
  );
};

export default ThreeColLeftPage;
