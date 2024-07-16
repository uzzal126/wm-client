import { FC, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DetailsWithPrice from "../common/detail-price";
import { GalleryNavigator, ImageGallery } from "../common/gallery";
import ProductTab from "../common/product-tab";
import SidebarHelper from "../helper/sidebarHelper";

type Props = {
  product: any;
};

const LeftSidebarPage: FC<Props> = ({ product }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });

  const slider1: any = useRef(null);
  const slider2: any = useRef(null);

  const changeColorVar = (img_id: any) => {
    slider2?.current?.slickGoTo(img_id);
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [product]);
  const { nav1, nav2 } = state;

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter" id="filter">
              <SidebarHelper />
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col lg="6" className="product-thumbnail">
                    {slider1 && (
                      <ImageGallery
                        images={product?.variants}
                        navRef={nav2}
                        rootRef={slider1}
                      />
                    )}
                    <div
                      style={{
                        width: `${
                          product?.variants?.length >= 3
                            ? "100"
                            : product?.variants?.length % 3 === 0
                            ? 1
                            : product?.variants?.length * 33.333333
                        }%`,
                      }}
                    >
                      <GalleryNavigator
                        images={product?.variants}
                        navRef={nav1}
                        rootRef={slider2}
                      />
                    </div>
                  </Col>
                  <Col lg="6" className="rtl-text">
                    <DetailsWithPrice
                      item={product}
                      changeImage={changeColorVar}
                    />
                  </Col>
                </Row>
              </Container>
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

export default LeftSidebarPage;