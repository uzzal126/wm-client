import { FC } from "react";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";

import Link from "next/link";
import { getProductURL, getThumbnail } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import ProductItem from "../widgets/product-box/ProductBox1";
import {
  CardBtn,
  CompareBtn,
  QuickViewBtn,
  WishlistBtn,
} from "../widgets/product-box/includes/btns";
import {
  PriceParties,
  RatingMake,
} from "../widgets/product-box/includes/parties";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  products: any;
  center?: boolean;
  loading: boolean;
  cartClass: string;
};

const Single: FC<Props> = ({ center, products, loading, cartClass }) => {
  return (
    <Col md="4" className={center ? "center-slider" : ""}>
      {center ? (
        <div>
          {loading ? (
            <PostLoader />
          ) : (
            <Slider autoplay className="offer-slider">
              {products &&
                products.length > 0 &&
                products.map((product: any, i: number) => (
                  <div key={i} className="text-center">
                    <ProductItem product={product} cartClass={cartClass} />
                  </div>
                ))}
            </Slider>
          )}
        </div>
      ) : (
        <div className={!center ? "theme-card center-align" : ""}>
          <div className="offer-slider">
            {loading ? (
              <>
                <PostLoader />
                <PostLoader />
              </>
            ) : (
              <div className="sec-1">
                {products &&
                  products.length > 0 &&
                  products.map((product: any, i: number) => (
                    <div className="product-box2" key={i}>
                      <div className="media">
                        <Link href={getProductURL(product)}>
                          <Media
                            className="img-fluid blur-up lazyload"
                            alt={product?.thumbnail?.alt}
                            src={getThumbnail(product)}
                          />
                        </Link>
                        <div className="media-body align-self-center">
                          <RatingMake size={16} total={product?.rating?.avg} />
                          <Link href={getProductURL(product)}>
                            <h6>{product.name}</h6>
                          </Link>
                          <PriceParties product={product} />
                          <div
                            className={"inline-cart"}
                            style={{ background: "rgba(50, 50, 50, 0.9)" }}
                          >
                            <CardBtn product={product} />
                            <WishlistBtn product={product} />
                            <QuickViewBtn product={product} />
                            <CompareBtn product={product} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </Col>
  );
};

type scProps = {
  data: any;
  settings: any;
  cartClass: string;
  title: string;
};

const SingleComponent: FC<scProps> = ({ cartClass, data, settings, title }) => {
  const cat_list = Array.isArray(data) ? data?.filter(e => e?.id !== 0) : [];
  if (cat_list.length === 0) return <></>;
  let ids = cat_list.map(obj => JSON.stringify(obj.id)).join(",");
  const param = `/${ids}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  return (
    <section className="section-b-space">
      <div className="full-box">
        <Container>
          <div className="title4">
            <h2 className="title-inner4">{title}</h2>
            <div className="line">
              <span></span>
            </div>
          </div>
          <Row>
            {products && products?.length > 0 ? (
              <>
                <Single
                  products={products.slice(0, 2)}
                  loading={loading}
                  cartClass={cartClass}
                />
                <Single
                  products={products.slice(2, products.length - 2)}
                  loading={loading}
                  cartClass={cartClass}
                  center={true}
                />
                <Single
                  products={products.slice(
                    products.length - 2,
                    products.length
                  )}
                  loading={loading}
                  cartClass={cartClass}
                />
              </>
            ) : null}
          </Row>
        </Container>
      </div>
    </section>
  );
};

type ProType = {
  data: any;
  cartClass: string;
};

const ProductCollection7: FC<ProType> = ({ data, cartClass }) => {
  return (
    <SingleComponent
      cartClass={cartClass}
      data={data?.list}
      title={data?.title}
      settings={data?.setting}
    />
  );
};

export { ProductCollection7 };
