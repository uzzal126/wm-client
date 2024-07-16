import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { sliderConfig } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import ProductSection from "../widgets/product-box/ProductBox6";
import { useQueryProducts } from "./hooks/useQueryProducts";

const ProductCollection13 = ({
  data,
  loading,
  type,
  cartClass,
  title,
}: any) => {
  const settings = data?.setting;
  const cat_list: any = Array.isArray(data);
  let ids = cat_list.map((obj: any) => JSON.stringify(obj.id)).join(",");
  const param = `/${ids}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;
  const { products, hasMore } = useQueryProducts(param);

  return (
    <>
      <section className="game-product p-t-0 ratio_asos">
        {title ? (
          <div className="title2">
            <h2 className="title-inner2">{title}</h2>
          </div>
        ) : (
          ""
        )}

        <Container>
          <Row>
            <Col>
              {!data ||
              !data.products ||
              !data.products.items ||
              data.products.items.length === 0 ||
              loading ? (
                <div className="mx-0 row margin-default">
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                  <div className="col-xl-3 col-lg-4 col-6">
                    <PostLoader />
                  </div>
                </div>
              ) : (
                <Slider
                  {...sliderConfig(
                    settings?.slider,
                    settings?.show,
                    products.length
                  )}
                  className="product-slider-5 product-m no-arrow"
                >
                  {data &&
                    data.products.items
                      .slice(0, 5)
                      .map((product: any, index: any) => (
                        <ProductSection product={product} key={index} />
                      ))}
                </Slider>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export { ProductCollection13 };
