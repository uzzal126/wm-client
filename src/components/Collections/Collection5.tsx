import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { linkHandler } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import ProductBox4 from "../widgets/product-box/ProductBox4";
import LeftCollection from "./LeftCollection";
import { useQueryProducts } from "./hooks/useQueryProducts";

type Props = {
  data: any;
  settings: any;
  cartClass: any;
};

const SinlgeMiddle: FC<Props> = ({ data, settings, cartClass }) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  const param = `/${data?.id}?page=1&items_per_page=${
    settings?.show?.no_of_item_show || 20
  }`;

  const { loading, products, hasMore } = useQueryProducts(param);

  return (
    <Col lg="4" className="border-0 ccenter-slider">
      <div>
        <div className="title4">
          <h2 className="title-inner4">{""}</h2>
          <div className="line">
            <span></span>
          </div>
        </div>
        {!products || products.length === 0 || loading ? (
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
          <>
            <Slider
              autoplay
              className="offer-slider slide-1 center-image-width no-arrow"
            >
              {products &&
                products.length > 0 &&
                products.map((product, i) => (
                  <div key={i}>
                    <ProductBox4 product={product} cartClass={cartClass} />
                  </div>
                ))}
            </Slider>
            {hasMore && (
              <div className="my-4">
                <div style={{ textAlign: "center" }}>
                  <Link
                    href={linkHandler(data, allMenus)}
                    className="rounded btn btn-sm btn-outline-primary"
                  >
                    More Products <i className="ml-2 fa fa-arrow-right" />
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Col>
  );
};

type lProps = {
  data: any;
  settings: any;
};

const SingleLeft: FC<lProps> = ({ data, settings }) => {
  return (
    <Col lg="4">
      <LeftCollection
        data={data}
        settings={settings}
        border="card-border"
        show={3}
      />
    </Col>
  );
};

type ProType = {
  data: any;
  cartClass: any;
  designClass: any;
};

const ProductCollection5: FC<ProType> = ({ data, cartClass, designClass }) => {
  return (
    <section className={designClass}>
      <Container>
        <Row className="partition3 partition_3">
          {data?.list && data?.list?.length > 0 ? (
            <>
              <SingleLeft data={data.list[0] || []} settings={data?.setting} />

              <SinlgeMiddle
                data={data.list[1] || []}
                cartClass={cartClass}
                settings={data?.setting}
              />

              <SingleLeft data={data.list[2] || []} settings={data?.setting} />
            </>
          ) : null}
        </Row>
      </Container>
    </section>
  );
};

export { ProductCollection5 };
