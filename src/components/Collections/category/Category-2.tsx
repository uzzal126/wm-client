import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Container, Media, Row } from "reactstrap";
import {
  imageDimentionHelper,
  linkHandler,
  styleGenerator,
} from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";

type Component = {
  even: any;
  item: any;
};

const SingleCategory: FC<Component> = ({ even, item }) => {
  let storeData = useSelector(selectStoreData);
  const { menu_all } = storeData;

  const [imageUrl, setImageUrl] = useState("");

  const checkImage = imageDimentionHelper(item?.thumb, 450, 450);

  useEffect(() => {
    let dummy = `https://dummyimage.com/${450}x${450}/d6d6d6/fff`;

    if (checkImage) {
      setImageUrl(item?.thumb);
    } else {
      setImageUrl(dummy);
    }
  }, [checkImage]);

  return (
    <Col className="p-0">
      <div>
        {!even && (
          <div>
            <div className="position-relative">
              <Link href={linkHandler(item, menu_all)} className="image-block">
                <Media
                  alt=""
                  src={
                    item?.thumb ||
                    item?.icon ||
                    `https://dummyimage.com/${450}x${450}/d6d6d6/fff`
                  }
                  className="img-fluid blur-up lazyload bg-img"
                />
              </Link>
            </div>
          </div>
        )}
        <div>
          <div
            className={`contain-block position-relative ${
              even ? "even pt-5" : "pb-5"
            }`}
          >
            <div className="px-2">
              <h6>{item?.description}</h6>
              <Link href={linkHandler(item, menu_all)}>
                <h2>{item?.name}</h2>
              </Link>
              <Link
                href={linkHandler(item, menu_all)}
                className="btn btn-solid category-btn"
              >
                <span>shop now</span>
              </Link>
            </div>
          </div>
        </div>
        {even && (
          <div>
            <div className="position-relative">
              <Link
                href={linkHandler(item, menu_all)}
                className="image-block even"
              >
                <Media
                  alt=""
                  src={
                    item?.thumb ||
                    item?.icon ||
                    `https://dummyimage.com/${450}x${450}/d6d6d6/fff`
                  }
                  className="img-fluid blur-up lazyload bg-img"
                />
              </Link>
            </div>
          </div>
        )}
      </div>
    </Col>
  );
};

type Props = {
  data: any;
};

const CategoryTwo: FC<Props> = ({ data }) => {
  let existingData =
    data?.list &&
    data?.list.length > 0 &&
    data?.list.filter((f: any) => f.id !== 0).length > 0
      ? data?.list.filter((f: any) => f.id !== 0)
      : [];
  return (
    <div
      className="category-bg ratio_square"
      style={{
        ...styleGenerator(data?.setting?.styles),
      }}
    >
      <Container fluid={true} className="p-0">
        <Row
          className="order-section"
          xs={1}
          md={2}
          xl={existingData.length < 4 ? existingData.length : 4}
        >
          {existingData.length > 0
            ? existingData.map((item: any, i: number) => {
                return (
                  <SingleCategory
                    item={item}
                    even={i % 2 === 0 ? false : true}
                  />
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
};

export { CategoryTwo };
