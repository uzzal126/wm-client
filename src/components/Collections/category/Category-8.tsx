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
const cart1 = "/assets/images/watch/cat1.png";

const Data = [
  {
    img: cart1,
    title: "watch models",
    features:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    link: "#",
  },
  {
    img: cart1,
    title: "calculator watch",
    features:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    link: "#",
  },
  {
    img: cart1,
    title: "antimegnatic watch",
    features:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    link: "#",
  },
  {
    img: cart1,
    title: "history of watches",
    features:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    link: "#",
  },
  {
    img: cart1,
    title: "watch models",
    features:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    link: "#",
  },
];
type Component = {
  img: any;
  title: any;
  link: any;
  features: number;
  minHeight?: any;
};
const MasterCategory: FC<Component> = ({
  img,
  title,
  features,
  link,
  minHeight,
}) => {
  const [imageUrl, setImageUrl] = useState("");

  const checkImage = imageDimentionHelper(img, 450, 350);

  useEffect(() => {
    let dummy = `https://dummyimage.com/${450}x${350}/d6d6d6/fff`;

    if (checkImage) {
      setImageUrl(img);
    } else {
      setImageUrl(dummy);
    }
  }, [checkImage]);

  return (
    <div>
      <div className="category-wrapper">
        <div>
          <div className="px-5">
            <img
              src={img || `https://dummyimage.com/${450}x${350}/d6d6d6/fff`}
              className="img-fluid blur-up lazyload bg-img w-100"
              alt=""
              style={{ minHeight: minHeight || "auto" }}
            />
          </div>
          <Link href={link || "#"}>
            <h4>{title}</h4>
          </Link>
          <ul className="category-link">
            <li>{features}</li>
          </ul>
          <Link href={link || "#"} className="btn btn-outline">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};
type Props = {
  data: any;
};
const CategoryEight: FC<Props> = ({ data }) => {
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
        className="section-b-space ratio_portrait"
        style={{
          ...styleGenerator(data?.setting?.styles),
        }}
      >
        <Container>
          {data?.setting?.layout_type === "slider" ? (
            <Slider {...customConfig} className="slide-4 category-m no-arrow">
              {existingData.map((data: any, i: any) => {
                return (
                  <MasterCategory
                    key={i}
                    img={data.thumb || data.img || data.icon}
                    link={linkHandler(data, menu_all)}
                    title={data.name || data.title}
                    features={data.description || data.features}
                    minHeight={"110px"}
                  />
                );
              })}
            </Slider>
          ) : (
            <Row
              xl={data?.setting?.show?.desktop_row || 5}
              md={3}
              xs={2}
              className="category-m"
            >
              {existingData.map((data: any, i: any) => {
                return (
                  <Col className="mb-4" key={i}>
                    <MasterCategory
                      img={data.thumb || data.img || data.icon}
                      link={linkHandler(data, menu_all)}
                      title={data.name || data.title}
                      features={data.description || data.features}
                      minHeight={"110px"}
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

export { CategoryEight };
