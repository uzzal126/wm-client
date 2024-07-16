import Link from "next/link";
import { FC, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import { ImageHelper } from "../../helpers/lazy-load-image/image-lazy-load";
import { getProductURL, getThumbnail, groupByThree } from "../../helpers/misc";
import PostLoader from "../../helpers/preloader/PostLoader";
import { TAG_LIST } from "../../helpers/services/api";
import {
  getProductsByTagId,
  getQueryRequest,
} from "../../helpers/services/request";
import { selectStoreData } from "../../redux-handler/reducers/storeDataReducer";
import {
  PriceParties,
  RatingMake,
} from "../widgets/product-box/includes/parties";

type Props = {
  data: any;
  settings: any;
};

const SingleTab: FC<Props> = ({ data, settings }) => {
  let storeData = useSelector(selectStoreData);
  const allMenus = storeData.menu_all;

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [Tag, setTag] = useState<any>([]);

  useEffect(() => {
    if (data?.id === 0) return;
    getProducts(data?.id);
    getTag(data?.id);
  }, [data]);

  const getProducts = async (id: any) => {
    setLoading(true);
    const res = await getProductsByTagId(id, settings?.show?.no_of_item_show);
    setLoading(false);

    if (res.success && res.status_code === 200) {
      var n = 3;
      let prods = groupByThree(res.data, n);
      setProducts(prods);
    }
  };

  const getTag = async (id: any) => {
    const res2 = await getQueryRequest(TAG_LIST);
    if (res2?.success && res2?.data?.length > 0) {
      const tag = res2?.data?.filter((e: any) => e?.id == id)[0];
      if (tag) {
        setTag(tag);
      }
    }
  };

  return (
    <Col>
      {loading ? (
        <div>
          <PostLoader />
          <PostLoader />
        </div>
      ) : (
        <div className="theme-card mb-4">
          <h5 className="title-border">{Tag?.title || "Not Found"}</h5>
          <Slider className="offer-slider slide-1">
            {products && products.length > 0 ? (
              products.map((groupProduct: any, i: number) => (
                <div key={i}>
                  {groupProduct.length > 0 &&
                    groupProduct.map((product: any, index: number) => (
                      <div
                        className="media d-flex flex-column flex-lg-row"
                        key={index}
                      >
                        <div
                          style={{
                            minWidth:
                              window.innerWidth > 600 ? "150px" : "auto",
                            maxWidth:
                              window.innerWidth > 600 ? "150px" : "auto",
                          }}
                        >
                          <Link href={getProductURL(product)}>
                            <ImageHelper
                              src={getThumbnail(product)}
                              className="img-fluid"
                              alt={product?.name}
                            />
                          </Link>
                        </div>
                        <div className="media-body align-self-center">
                          <RatingMake total={product?.rating?.avg} />
                          <Link href={getProductURL(product)}>
                            <h6>{product?.name || product?.title}</h6>
                          </Link>
                          <PriceParties product={product} />
                        </div>
                      </div>
                    ))}
                </div>
              ))
            ) : (
              <span>No Data Found!</span>
            )}
          </Slider>
        </div>
      )}
    </Col>
  );
};

type ProType = {
  data: any;
};

const ProductCollection9: FC<ProType> = ({ data }) => {
  //console.log("data", data);
  return (
    <Fragment>
      <section className={`section-b-space`}>
        <Container>
          <Row
            className="multiple-slider"
            xl={
              data?.setting?.show?.desktop_row > 4
                ? data.list.length <= 4
                  ? data.list.length
                  : "4"
                : data?.setting?.show?.desktop_row
            }
            lg={
              data?.setting?.show?.tablet_row > 3
                ? "3"
                : data?.setting?.show?.tablet_row
            }
            sm={
              data?.setting?.show?.mobile_row > 2
                ? "2"
                : data?.setting?.show?.mobile_row
            }
          >
            {data &&
              data?.list &&
              data.list.length > 0 &&
              data.list.map((item: any, i: number) => (
                <SingleTab data={item} key={i} settings={data?.setting} />
              ))}
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export { ProductCollection9 };
