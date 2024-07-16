import { useCart } from "@/contexts/cart/CartContext";
import { useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import DetailsWithPrice from "../common/detail-price";
import ImageZoom from "../common/image-zoom";

const LeftImagePage = () => {
  const { addToCart } = useCart();
  const curContext = useContext(CurrencyContext);
  const symbol = curContext.state.symbol;
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
    infinite: false,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    vertical: true,
    focusOnSelect: true,
    infinite: false,
  };

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);

  const changeColorVar = (img_id) => {
    slider2.current.slickGoTo(img_id);
  };

  const { nav1, nav2 } = state;

  return (
    <section>
      <div className="collection-wrapper">
        <Container>
          {!data || !data.product || data.product.length === 0 || loading ? (
            "loading"
          ) : (
            <Row className="leftImage">
              <Col lg="1" sm="2" xs="12">
                <Row>
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
                </Row>
              </Col>
              <Col lg="5" sm="10" xs="12" className="order-up">
                <Slider
                  {...products}
                  asNavFor={nav2}
                  ref={(slider) => (slider1.current = slider)}
                  className="product-right-slick">
                  {data.product.variants
                    ? data.product.images.map((vari, index) => (
                        <div key={index}>
                          <ImageZoom image={vari} />
                        </div>
                      ))
                    : data.product.images.map((vari, index) => (
                        <div key={index}>
                          <ImageZoom image={vari} />
                        </div>
                      ))}
                </Slider>
              </Col>
              <Col lg="6" className="rtl-text">
                <DetailsWithPrice
                  symbol={symbol}
                  item={data.product}
                  changeColorVar={changeColorVar}
                  navOne={state.nav1}
                  addToCartClicked={addToCart}
                />
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </section>
  );
};

export default LeftImagePage;
