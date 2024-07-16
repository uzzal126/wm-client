import Link from "next/link";
import { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import { Container } from "reactstrap";
import {
  linkHandler,
  sliderConfig,
  styleGenerator,
} from "../../../helpers/misc";
import { selectStoreData } from "../../../redux-handler/reducers/storeDataReducer";

const size = [
  {
    name: "size 01",
  },
  {
    name: "size 02",
  },
  {
    name: "size 03",
  },
  {
    name: "size 04",
  },
  {
    name: "size 05",
  },
];

type Props = {
  data: any;
};

const CategoryFive: FC<Props> = ({ data }) => {
  let storeData = useSelector(selectStoreData);
  const { menu_all } = storeData;

  let existingData =
    data?.list &&
    data?.list.length > 0 &&
    data?.list.filter((f: any) => f.id !== 0).length > 0
      ? data?.list.filter((f: any) => f.id !== 0)
      : size;

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
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Fragment>
      <section
        className="py-3"
        style={{
          ...styleGenerator(data?.setting?.styles),
        }}
      >
        <Container>
          <Slider {...customConfig} className="background">
            {existingData.map((item: any, i: any) => (
              <div className="px-2" key={i}>
                <Link href={linkHandler(item, menu_all)}>
                  <div className="mx-1 contain-bg">
                    <h4 data-hover="size 06">{item?.name}</h4>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </Container>
      </section>
    </Fragment>
  );
};

export { CategoryFive };
