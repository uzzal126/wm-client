import { FC, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Details from "../common/details";
import { GalleryNavigator, ImageGallery } from "../common/gallery";
import ProductTab from "../common/product-tab";

type Props = {
  product: any;
};

const ThreeColRightPage: FC<Props> = ({ product }) => {
  const [state, setState] = useState({ nav1: null, nav2: null })
  const slider1 = useRef(null);

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
          <Row className="leftImage">
            <Col lg="4">
              <Row>
                <Col>
                  {slider1 && (
                    <ImageGallery
                      images={product?.variants}
                      navRef={nav2}
                      rootRef={slider1}
                    />
                  )}
                </Col>
              </Row>

              <Row>
                <Col xs="12" className="">
                  <div
                    style={{
                      width: `${product?.variants?.length >= 3
                        ? "100"
                        : product?.variants?.length % 3 === 0
                          ? 1
                          : product?.variants?.length * 33.333333
                        }%`,
                    }}>
                    <GalleryNavigator
                      images={product?.variants}
                      navRef={nav1}
                      rootRef={slider2}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Details data={product} changeImage={changeColorVar} />
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

export default ThreeColRightPage;
