import Link from "next/link";
import { FC, Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Col, Container, Row } from "reactstrap";
import {
  imageDimentionHelper,
  linkHandler,
  sliderConfig,
  styleGenerator,
} from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";
const Banner5 = "/assets/images/fashion/banner/5.jpg";

const Data = [
  {
    img: Banner5,
    title: "casual collection",
    desc: "festival sale",
    link: "#",
    classes: "p-left text-left",
  },
  {
    img: Banner5,
    title: "going out collection",
    desc: "upto 80% off",
    link: "#",
    classes: "p-left text-left",
  },
  {
    img: Banner5,
    title: "shoes & sandle",
    desc: "new collection",
    link: "#",
    classes: "p-left text-left",
  },
];

type Component = {
  img: any;
  title: any;
  link: any;
  minHeight?: any;
};

const MasterBanner: FC<Component> = ({ img, title, link, minHeight }) => {
  const [imageUrl, setImageUrl] = useState("");

  const checkImage = imageDimentionHelper(img, 780, 520);

  useEffect(() => {
    let dummy = `https://dummyimage.com/${780}x${520}/d6d6d6/fff`;

    if (checkImage) {
      setImageUrl(img);
    } else {
      setImageUrl(dummy);
    }
  }, [checkImage]);

  return (
    <div className="px-2 pb-4">
      <Link href={link || "#"} style={{ cursor: "pointer" }}>
        <div className={`collection-banner p-left text-left`}>
          <img
            src={img || `https://dummyimage.com/${450}x${350}/d6d6d6/fff`}
            alt=""
            className="img-fluid blur-up lazyload bg-img"
            style={{ minHeight: minHeight || "auto" }}
          />
          <div className="absolute-contain">
            <h3 className="mb-0">{title}</h3>
            {/* <h4>{desc}</h4> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

type Props = {
  data: any;
};

const CategoryNine: FC<Props> = ({ data }) => {
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
        className="banner-padding banner-furniture absolute_banner ratio3_2"
        style={{
          ...styleGenerator(data?.setting?.styles),
        }}
      >
        <Container>
          {data?.setting?.layout_type === "slider" ? (
            <Slider {...customConfig} className="slide-4 partition3 no-arrow">
              {existingData.map((data: any, i: any) => {
                return (
                  <MasterBanner
                    key={i}
                    img={data.thumb || data.img}
                    title={data.name || data.title}
                    link={linkHandler(data, menu_all)}
                    minHeight={"120px"}
                  />
                );
              })}
            </Slider>
          ) : (
            <Row
              className="partition3"
              xl={data?.setting?.show?.desktop_row || 5}
              md={3}
              xs={2}
            >
              {existingData.map((data: any, i: any) => {
                return (
                  <Col className="px-0 mb-3" key={i}>
                    <MasterBanner
                      img={data.thumb || data.img}
                      title={data.name || data.title}
                      link={linkHandler(data, menu_all)}
                      minHeight={"60px"}
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

export { CategoryNine };
