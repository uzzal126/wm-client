import React, { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import { Container, Row, Col } from "reactstrap";
import PostLoader from "../../helpers/preloader/PostLoader";
import { TAG_LIST } from "../../helpers/services/api";
import {
  getProductsByCatId,
  getProductsByTagId,
  getQueryRequest,
} from "../../helpers/services/request";
import ProductItem from "../widgets/product-box/ProductBox8";
import LeftCollection from "./LeftCollection";

type sProps = {
  data: any;
  settings: any;
  cartClass: any;
  tagCollection?: boolean;
};

const SingleMiddle: FC<sProps> = ({
  data,
  settings,
  tagCollection,
  cartClass,
}) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState<any>({});

  useEffect(() => {
    if (data?.id == 0) return;
    getProducts(data?.id);
  }, [data]);

  const getProducts = async (id: any) => {
    setLoading(true);
    let res = [];
    if (tagCollection) {
      res = await getProductsByTagId(id, settings?.show?.no_of_item_show);
    } else {
      res = await getProductsByCatId(id, settings?.show?.no_of_item_show);
    }
    setLoading(false);
    if (res.success && res.status_code === 200) {
      if (tagCollection) {
        const res2 = await getQueryRequest(TAG_LIST);
        if (res2?.success && res2?.data?.length > 0) {
          const tag = res2?.data?.filter((e: any) => e?.id == id)[0];
          if (tag) {
            setCategory(tag);
          }
        }
      } else {
        setCategory(res.category[0]);
      }
      setProducts(res.data);
    }
  };

  if (loading) return <PostLoader />;

  return (
    <Col lg="4" className="center-slider border-0">
      <div>
        <div className="title2">
          <h4>{category?.description}</h4>
          <h2 className="title-inner2">
            {category?.text || category?.title || "Not Found"}
          </h2>
        </div>
        <Slider
          autoplay
          className="offer-slider slide-1 center-image-width no-arrow">
          {products && products.length > 0 ? (
            products.map((product, i) => (
              <div key={i}>
                <ProductItem product={product} cartClass={cartClass} />
              </div>
            ))
          ) : (
            <span>No Data Found!</span>
          )}
        </Slider>
      </div>
    </Col>
  );
};

type lProps = {
  data: any;
  settings: any;
  tagCollection?: boolean;
};

const SingleLeft: FC<lProps> = ({ data, settings, tagCollection }) => {
  return (
    <Col lg="4">
      <LeftCollection
        tagCollection={tagCollection}
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
  cartClass: string;
  designClass?: string;
  tagCollection?: boolean;
};

const ProductCollection8: FC<ProType> = ({
  data,
  tagCollection,
  cartClass,
  designClass,
}) => {
  return (
    <section className={designClass || ""}>
      <Container>
        <Row className="partition3 partition_3">
          {data?.list && data?.list?.length > 0 ? (
            <>
              <SingleLeft
                tagCollection={tagCollection}
                data={data.list[0] || []}
                settings={data?.setting}
              />

              <SingleMiddle
                tagCollection={tagCollection}
                data={data.list[1] || []}
                cartClass={cartClass}
                settings={data?.setting}
              />

              <SingleLeft
                tagCollection={tagCollection}
                data={data.list[2] || []}
                settings={data?.setting}
              />
            </>
          ) : null}
        </Row>
      </Container>
    </section>
  );
};

export { ProductCollection8 };
