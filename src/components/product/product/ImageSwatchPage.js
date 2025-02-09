import React, { useContext, useState, useRef, useEffect } from "react";
import { Container, Row, Col, Media } from "reactstrap";
import Slider from "react-slick";
import shoes from "../../../public/assets/images/fashion/pro/shoes.jpg";
import skirt from "../../../public/assets/images/fashion/pro/skirt.jpg";
import one from "../../../public/assets/images/fashion/pro/001.jpg";
import SwatchDetailsWithPrice from "../common/swatch-detail-price";
import ImageZoom from "../common/image-zoom";

const ImageSwatchPage = () => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  var { loading, data } = useQuery(GET_SINGLE_PRODUCTS, {
    variables: {
      id: 1,
    },
  });
  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);

  const { nav1, nav2 } = state;

  return (
    <section className="section-b-space">
      <div className="collection-wrapper">
        <Container>
          {!data || !data.product || data.product.length === 0 || loading ? (
            "loading"
          ) : (
            <Row className="leftImage">
              <Col lg="6">
                <Slider
                  {...products}
                  asNavFor={nav2}
                  ref={(slider) => (slider1.current = slider)}
                  className="product-right-slick">
                  {data.product.images.map((vari, index) => (
                    <div key={index}>
                      <ImageZoom image={vari} />
                    </div>
                  ))}
                </Slider>

                <Row>
                  <Col sm="12">
                    <Slider
                      className="slider-nav"
                      {...productsnav}
                      asNavFor={nav1}
                      ref={(slider) => (slider2.current = slider)}>
                      {data.product.variants
                        ? data.product.images.map((vari, index) => (
                            <div key={index}>
                              <Media
                                src={`${vari.src}`}
                                key={index}
                                alt={vari.alt}
                                className="img-fluid"
                              />
                            </div>
                          ))
                        : ""}
                    </Slider>
                  </Col>
                </Row>
              </Col>
              <Col lg="6" className="rtl-text">
                <SwatchDetailsWithPrice
                  changeColorVar={changeColorVar}
                  item={data.product}
                />
                <div className="border-product">
                  <h6 className="product-title">Frequently bought together</h6>
                  <div className="bundle">
                    <div className="bundle_img">
                      <div className="img-box">
                        <a href="#">
                          <Media
                            src={one}
                            alt=""
                            className="img-fluid blur-up lazyload"
                          />
                        </a>
                      </div>
                      <span className="plus">+</span>
                      <div className="img-box">
                        <a href="#">
                          <Media
                            src={skirt}
                            alt=""
                            className="img-fluid blur-up lazyload"
                          />
                        </a>
                      </div>
                      <span className="plus">+</span>
                      <div className="img-box">
                        <a href="#">
                          <Media
                            src={shoes}
                            alt=""
                            className="img-fluid blur-up lazyload"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="bundle_detail">
                      <div className="theme_checkbox">
                        <label>
                          this product: WOMEN PINK SHIRT{" "}
                          <span className="price_product">$55</span>
                          <input type="checkbox" defaultChecked />
                          <span className="checkmark"></span>
                        </label>
                        <label>
                          black long skirt{" "}
                          <span className="price_product">$20</span>
                          <input type="checkbox" defaultChecked />
                          <span className="checkmark"></span>
                        </label>
                        <label>
                          women heeled boots{" "}
                          <span className="price_product">$15</span>
                          <input type="checkbox" defaultChecked />
                          <span className="checkmark"></span>
                        </label>
                        <a href="#" className="btn btn-solid btn-xs">
                          buy this bundle
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </section>
  );
};

export default ImageSwatchPage;
