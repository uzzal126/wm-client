import Link from "next/link";
import { FC, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Media, Row } from "reactstrap";
import {
  imageDimentionHelper,
  linkHandler,
  sliderConfig,
  styleGenerator,
} from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
const cart1 = "/assets/images/cat1.jpg";
const cart2 = "/assets/images/cat2.jpg";
const cart3 = "/assets/images/cat3.jpg";

const Data = [
  {
    img: cart1,
    title: "men",
    link: "#",
  },
  {
    img: cart2,
    title: "women",
    link: "#",
  },
  {
    img: cart3,
    title: "kids",
    link: "#",
  },
];
type Component = {
  img: any;
  title: any;
  link: any;
  count: number;
  minHeight?: any;
};
const MasterCategory: FC<Component> = ({
  count,
  img,
  title,
  link,
  minHeight,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const checkImage = imageDimentionHelper(
    img,
    count <= 2 ? 650 : 450,
    count <= 2 ? 250 : 350
  );

  let dummy = `https://dummyimage.com/${count <= 2 ? 650 : 450}x${
    count <= 2 ? 250 : 350
  }/d6d6d6/fff`;

  useEffect(() => {
    if (checkImage) {
      setImageUrl(img);
    } else {
      setImageUrl(dummy);
    }
  }, [checkImage]);

  return (
    <div className="border-padding">
      <div className="category-banner">
        <div>
          <Media
            src={img || dummy}
            className="img-fluid blur-up lazyload bg-img"
            alt=""
            style={{ minHeight: minHeight || "auto" }}
          />
        </div>
        <div className="category-box">
          <Link href={link || "#"}>
            <h2>{title}</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

type Props = {
  data: any;
};

const CategorySix: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const { menu_all } = storeData;

  let existingData =
    data?.list &&
    data?.list.length > 0 &&
    data?.list.filter((f: any) => f.id !== 0).length > 0
      ? data?.list.filter((f: any) => f.id !== 0)
      : Data;
  const customConfig = {
    ...sliderConfig(
      data?.setting?.slider,
      data?.setting?.show,
      existingData.length
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          infinite: true,
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          autoplay: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Fragment>
      <section
        className="p-0 ratio2_1"
        style={{
          ...styleGenerator(data?.setting?.styles),
        }}
      >
        <Container fluid={false}>
          {data?.setting?.layout_type === "slider" ? (
            <Slider {...customConfig} className="category-border">
              {existingData.map((data: any, i: any) => {
                return (
                  <MasterCategory
                    key={i}
                    img={data.thumb || data.img || data.icon}
                    count={existingData.length}
                    title={data.name || data.title}
                    link={linkHandler(data, menu_all)}
                    minHeight={"100px"}
                  />
                );
              })}
            </Slider>
          ) : (
            <Row
              xl={data?.setting?.show?.desktop_row || 5}
              md={3}
              xs={2}
              className="category-border"
            >
              {existingData.map((data: any, i: any) => {
                return (
                  <Col className="p-0 mb-3" key={i}>
                    <MasterCategory
                      img={data.thumb || data.img || data.icon}
                      count={existingData.length}
                      title={data.name || data.title}
                      link={linkHandler(data, menu_all)}
                      minHeight={"100px"}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export { CategorySix };
