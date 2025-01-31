import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import DetailsWithPrice from "../common/detail-price";
import ImageZoom from "../common/image-zoom";
import VerticalTab from "../common/vertical-product-tab";

const VerticalTabPage = () => {
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

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
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
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="12" xs="12">
              <div className="">
                <Row>
                  <Col xl="12">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        filter
                      </span>
                    </div>
                  </Col>
                </Row>
                {!data ||
                !data.product ||
                data.product.length === 0 ||
                loading ? (
                  "loading"
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail m-0-cls">
                      <Slider
                        {...products}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick">
                        {data.product.images.map((vari, index) => (
                          <div key={index}>
                            <ImageZoom image={vari} />
                          </div>
                        ))}
                      </Slider>
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
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        item={data.product}
                        changeColorVar={changeColorVar}
                      />
                    </Col>
                  </Row>
                )}
              </div>
              <VerticalTab />
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default VerticalTabPage;
