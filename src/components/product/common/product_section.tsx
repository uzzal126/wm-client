import { ImageHelper } from "@/helpers/lazy-load-image/image-lazy-load";
// import { productsApi } from "@/redux-handler/api/slices/productSlice";
import SkeletonLoader from "@/components/spinners/SkeletonLoader";
import {
  formatLongString,
  getProductURL,
  getThumbnail,
  sliderConfig,
} from "@/helpers/misc";
import { useGetProductByCategoryQuery } from "@/redux-handler/api/slices/productSlice";
import { useAppDispatch } from "@/store";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import {
  CardBtn,
  CompareBtn,
  QuickViewBtn,
  WishlistBtn,
} from "../../widgets/product-box/includes/btns";
import {
  PriceParties,
  RatingMake,
} from "../../widgets/product-box/includes/parties";

type Props = {
  data: any;
};

const ProductSection: FC<Props> = ({ data }) => {
  const ids = data?.categories?.map((e: any) => e?.id);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState([]);
  const [params, setParams] = useState<any>("");

  const clickProductDetail = (product: any) => {
    const titleProps = product.name.split(" ").join("");
    router.push(`/product/${product.id}` + "-" + `${titleProps}`);
  };

  //new rtk query for recent products
  const {
    data: recentProds,
    error: recentProdErr,
    isLoading: recentProdLoading,
  } = useGetProductByCategoryQuery({ params: params });
  useEffect(() => {
    const param = `/${ids?.join(",")}?page=1&items_per_page=${
      data?.setting?.show.no_of_item_show || 20
    }`;
    setParams(param);
    if (recentProds?.status_code === 200) {
      setProducts(
        recentProds?.data.filter((e: any) => e?.id !== data?.id) || []
      );
    }
  }, [data, recentProds?.status_code]);

  if (recentProdLoading) {
    return (
      <section className="section-b-space ratio_asos">
        <Container>
          <Row>
            <Col className="product-related">
              <h2>Related products</h2>
              <div className="d-none d-lg-block">
                <SkeletonLoader
                  className="mx-2 my-2"
                  amount={3}
                  direction="row"
                />
              </div>
              <div className="d-block d-lg-none">
                <SkeletonLoader
                  className="mx-2 my-2"
                  amount={1}
                  direction="column"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
  if (products?.length === 0 || !products) return <></>;

  return (
    <section className="section-b-space ratio_asos">
      <Container>
        <Row>
          <Col className="product-related">
            <h2>Related products</h2>
          </Col>
        </Row>
        {recentProdLoading ? (
          <SkeletonLoader className="mx-2 my-2" amount={1} />
        ) : products?.length <= 0 ? (
          <></>
        ) : (
          <Slider
            {...sliderConfig(
              data?.setting?.slider,
              data?.setting?.show,
              products?.length
            )}
          >
            {products?.map((product: any, index: number) => (
              <div className="px-2" key={index}>
                <div className="product-box">
                  <div className="img-wrapper">
                    <Link href={getProductURL(product)}>
                      <>
                        <div className="front">
                          <ImageHelper
                            onClick={() => clickProductDetail(product)}
                            src={getThumbnail(product)}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                        <div className="back">
                          <ImageHelper
                            src={getThumbnail(product)}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                          />
                        </div>
                      </>
                    </Link>
                    <div
                      className="cart-info cart-wrap"
                      style={{ background: "rgba(50, 50, 50, 0.9)" }}
                    >
                      <CardBtn product={product} />
                      <WishlistBtn product={product} />
                      <QuickViewBtn product={product} />
                      <CompareBtn product={product} />
                    </div>
                  </div>
                  <div className="product-detail">
                    <RatingMake total={product?.rating?.avg} size={16} />
                    <Link href={getProductURL(product)}>
                      <h6>{formatLongString(product?.name, 40)}</h6>
                    </Link>
                    <PriceParties product={product} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </Container>
    </section>
  );
};

export default ProductSection;
