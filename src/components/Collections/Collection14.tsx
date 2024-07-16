import { getProductsByCatId } from "@/helpers/services/request";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import ProductItem from "../widgets/product-box/ProductBox1";

const ProductCollection14 = ({
  type,
  title,
  subtitle,
  designClass,
  noSlider,
  cartClass,
  data,
  settings,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data?.id == "0") return;
    getProducts(data?.id);
  }, [data]);

  const getProducts = async (id: any) => {
    setLoading(true);
    const res = await getProductsByCatId(id, settings?.show?.no_of_item_show);
    setLoading(false);
    if (res.success && res.status_code === 200) {
      setProducts(res.data);
    } else {
      setProducts([]);
    }
  };

  return (
    <>
      <div className="title1 title-gradient  section-t-space">
        {subtitle ? <h4>{subtitle}</h4> : ""}
        <h2 className="title-inner1">{title}</h2>
      </div>
      <section className={designClass}>
        {noSlider ? (
          <Container>
            <Row>
              {products &&
                products?.length > 0 &&
                products.slice(0, 8).map((product, index) => (
                  <Col xl="3" xs="6" key={index}>
                    <ProductItem
                      product={product}
                      key={index}
                      cartClass={cartClass}
                    />
                  </Col>
                ))}
            </Row>
          </Container>
        ) : (
          <>
            <div className="title1 title-gradient  section-t-space">
              {subtitle ? <h4>{subtitle}</h4> : ""}
              <h2 className="title-inner1">{title}</h2>
            </div>
            <Container>
              <Row className="partition-cls">
                {products &&
                  products?.length > 0 &&
                  products.slice(0, 8).map((product, index) => (
                    <Col xl="3" xs="6" key={index}>
                      <div>
                        <ProductItem product={product} key={index} />
                      </div>
                    </Col>
                  ))}
              </Row>
            </Container>
          </>
        )}
      </section>
    </>
  );
};

export { ProductCollection14 };
