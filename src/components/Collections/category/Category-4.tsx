import Link from "next/link";
import { FC } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Container } from "reactstrap";
import {
  linkHandler,
  sliderConfig,
  styleGenerator,
} from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";

const cart = "/assets/images/icon/cat1.png";
const cart2 = "/assets/images/icon/cat2.png";
const cart3 = "/assets/images/icon/cat3.png";
const cart4 = "/assets/images/icon/cat4.png";
const cart5 = "/assets/images/icon/cat5.png";
const cart6 = "/assets/images/icon/cat6.png";

const Data = [
  { img: cart, title: "Category 1", link: "#" },
  { img: cart2, title: "Category 2", link: "#" },
  { img: cart3, title: "Category 3", link: "#" },
  { img: cart4, title: "Category 4", link: "#" },
  { img: cart5, title: "Category 5", link: "#" },
  { img: cart6, title: "Category 6", link: "#" },
];

type Component = {
  img: any;
  title: any;
  link: any;
};

const MasterCategory: FC<Component> = ({ img, title, link }) => {
  return (
    <div className="category-block">
      <Link href={link ? link : "#"}>
        <div className="category-image">
          <img src={img} alt="" width={48} />
        </div>
      </Link>
      <div className="category-details">
        <Link href={link ? link : "#"}>
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  );
};

type Props = {
  data: any;
};

const CategoryFour: FC<Props> = ({ data }) => {
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
    infinite: true,
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
    <section
      className="section-b-space section-t-space border-section border-top-0"
      style={{
        ...styleGenerator(data?.setting?.styles),
      }}
    >
      <Container>
        <Slider {...customConfig} className="slide-6">
          {existingData.length > 0
            ? existingData.map((data: any, i: number) => {
                return (
                  <MasterCategory
                    key={i}
                    img={data.icon || data.img}
                    link={linkHandler(data, menu_all)}
                    title={data.name || data.title}
                  />
                );
              })
            : null}
        </Slider>
      </Container>
    </section>
  );
};

export { CategoryFour };
